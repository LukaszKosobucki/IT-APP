import React, { Component } from "react";
import { connect } from "react-redux";
import { TEAM, HOME, USER, MY_ACCOUNT, MY_EVENTS } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import { getEvent, getParticipantsForEvent } from "../../store/actions/events";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import EventForm from "../../components/EventForm/EventForm";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import Moment from "moment";
import { DropdownButton } from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { addImageToStorage, removeImageFromStorage } from "../../utils/files";

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
        });
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

  onAccept = () => {
    if (this.state.avatar.new && this.state.avatar.old) {
      removeImageFromStorage(this.props.userData.avatar);
    }
    const path = this.state.avatar.new
      ? addImageToStorage(this.props.userData.id, this.state.avatar.new)
      : this.props.userData.avatar;
    // ApiService.users()
    //   .editUser({
    //     changedData: {
    //       name: this.state.name,
    //       surname: this.state.surname,
    //       avatar: path,
    //     },
    //     id: this.props.userData.id,
    //   })
    //   .catch(console.error);
    // this.props.history.push(ADMIN);
  };

  hasChanges = () => {
    console.log(this.state.event.startDate)
    console.log(this.state.startDate)
    return this.state.image.new
    || this.state.event.name !== this.state.name
    || this.state.event.scale !== this.state.scale
    || this.state.event.type !== this.state.type
    || this.state.event.sportId !== this.state.sportId
    || this.state.event.level !== this.state.level
    || this.state.event.description !== this.state.description
    || this.state.event.startDate !== this.state.startDate
    || this.state.event.endDate !== this.state.endDate;
  }

  onCancel = () => this.props.history.push(MY_EVENTS);

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
