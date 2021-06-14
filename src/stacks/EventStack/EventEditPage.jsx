import React, { Component } from "react";
import { connect } from "react-redux";
import { HOME, MY_EVENTS, TEAM } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import {
  addNewEvent,
  editEvent,
  getEvent,
  getParticipantsForEvent,
} from "../../store/actions/events";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import EventForm from "../../components/EventForm/EventForm";
import { addImageToStorage, removeImageFromStorage } from "../../utils/files";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import { DropdownButton } from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { getTeam } from "../../store/actions/teams";
import firebase from "firebase/app";
import { logNetworkError } from "../../utils/error";

class EventFormPage extends Component {
  state = {
    event: {},
    participants: [],
    description: "",
    name: "",
    image: { new: "", old: "" },
    sportId: "",
    level: "",
    scale: "",
    type: "",
    startDate: null,
    endDate: null,
    applications: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    this.props.match.params.eventId &&
      getEvent(this.props.match.params.eventId)
        .then(([imageURL, rest]) => {
          this.setState({
            user: this.props.userData,
            ...rest,
            image: { old: imageURL, new: "" },
            startDate: rest.startDate.toDate(),
            endDate: rest.endDate.toDate(),
            event: {
              ...rest,
              startDate: rest.startDate.toDate(),
              endDate: rest.endDate.toDate(),
            },
          });
          return getParticipantsForEvent(rest.participantsIds, "teams");
        })
        .then((docs) => {
          const participants = docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          this.setState({ participants });
        })
        .then(
          () =>
            this.state.applications &&
            Promise.all(
              this.state.applications.map((application) => getTeam(application))
            )
        )
        .then((teams) =>
          this.setState({
            applications: teams.map((team) => ({
              name: team[1].name,
              value: team[1].id,
            })),
          })
        );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.sports && this.state.sports) {
    }
  }

  pushIdToHistory = (id) => {
    this.props.history.push(HOME);
  };

  onInputChange = (property) => (event) => {
    this.setState({ [property]: event.target.value });
  };

  onFileInputChange = (property) => (event) => {
    this.setState({
      [property]: { ...this.state[property], new: event.target.files[0] },
    });
  };

  onSelectChange = (property) => (data) => {
    this.setState({ [property]: data.value });
  };

  onDateSelectChange = (property) => (data) => {
    this.setState({ [property]: data });
  };

  onAccept = (event) => {
    event.preventDefault();
    this.props.match.params.eventId ? this.editEvent() : this.addEvent();
    this.props.history.push(MY_EVENTS);
  };

  addEvent = () => {
    const newEvent = {
      applications: [],
      brackets: [],
      description: this.state.description,
      endDate: this.state.endDate,
      image: "",
      level: this.state.level,
      matchesIds: [],
      name: this.state.name,
      organizerId: this.props.userData.id,
      participantsIds: [],
      sportId: this.state.sportId,
      type: this.state.type,
      startDate: this.state.startDate,
      scale: this.state.scale,
    };
    addNewEvent(newEvent, this.state.image.new);
  };

  editEvent = () => {
    let newEvent = {
      description: this.state.description,
      endDate: this.state.endDate,
      image: this.state.event.image,
      level: this.state.level,
      name: this.state.name,
      sportId: this.state.sportId,
      type: this.state.type,
      startDate: this.state.startDate,
      scale: this.state.scale,
    };
    if (this.state.image.new && this.state.image.old) {
      removeImageFromStorage(this.state.event.image);
    }
    if (this.state.image.new) {
      newEvent.image = addImageToStorage(
        `event/${this.state.id}`,
        this.state.image.new
      );
    }
    editEvent(this.state.id, newEvent);
  };

  hasChanges = () => {
    return (
      this.state.image.new ||
      this.state.event.name !== this.state.name ||
      this.state.event.scale !== this.state.scale ||
      this.state.event.type !== this.state.type ||
      this.state.event.sportId !== this.state.sportId ||
      this.state.event.level !== this.state.level ||
      this.state.event.description !== this.state.description ||
      this.state.event.startDate !== this.state.startDate ||
      this.state.event.endDate !== this.state.endDate
    );
  };

  onAcceptTeam = (teamId) => {
    const cpApplications = [...this.state.applications];
    cpApplications.splice(
      cpApplications.findIndex((id) => id === teamId),
      1
    );
    firebase
      .firestore()
      .collection("events")
      .doc(this.props.match.params.eventId)
      .update({
        participantsIds: [...this.state.participantsIds, teamId],
        applications: cpApplications,
      })
      .catch(logNetworkError);
  };

  onRejectTeam = (teamId) => {
    const cpApplications = [...this.state.applications];
    cpApplications.splice(
      cpApplications.findIndex((id) => id === teamId),
      1
    );
    firebase
      .firestore()
      .collection("events")
      .doc(this.props.match.params.eventId)
      .update({
        applications: cpApplications,
      });
  };

  onCancel = () => this.props.history.push(MY_EVENTS);

  template = (row) => (
    <TableItem key={row.value}>
      {row.name || "Brak"}
      <DropdownButton>
        <Link to={TEAM(row.value)}>View</Link>
        <a onClick={() => this.onAcceptTeam(row.value)}>Accept</a>
        <a onClick={() => this.onRejectTeam(row.value)}>Reject</a>
      </DropdownButton>
    </TableItem>
  );

  render() {
    console.log(this.state);
    this.state.sports?.find((sport) => {
      return sport.value === this.props.userData.sportId;
    });
    return (
      <main>
        <TitleWithButtons
          title={this.props.match.params.eventId ? "Edit event" : "Add event"}
        />
        <EventForm
          event={this.state.event}
          sports={this.props.sports}
          description={this.state.description}
          image={
            !this.state.image.new
              ? this.state.image.old
              : URL.createObjectURL(this.state.image.new)
          }
          onAccept={this.onAccept}
          onCancel={this.onCancel}
          onChange={this.onInputChange}
          hasChanges={this.hasChanges()}
          onSelectChange={this.onSelectChange}
          onDateSelectChange={this.onDateSelectChange}
          sportId={this.state.sportId}
          level={this.state.level}
          onFileChange={this.onFileInputChange}
          name={this.state.name}
          scale={this.state.scale}
          type={this.state.type}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          applications={this.state.applications}
          template={this.template}
        />
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  sports: state.sport.sports,
});

const mapDispatchToProps = {
  getSports,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventFormPage);
