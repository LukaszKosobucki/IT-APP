import React, { Component } from "react";
import { connect } from "react-redux";
import { TEAM, HOME, USER } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import { getEvent, getParticipantsForEvent } from "../../store/actions/events";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import EventLayout from "../../components/EventLayout/EventLayout";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import {
  DarkButton,
  DropdownButton,
} from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { USER_TYPES } from "../../constants/userTypes";
import SignUpModal from "../../components/SignUpModal/SignUpModal";
import Select from "../../components/shared/Select/Select";
import firebase from "firebase";

class UserAdmin extends Component {
  state = {
    event: {},
    participants: [],
    showModal: false,
    noticeId: "",
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    getEvent(this.props.match.params.eventId)
      .then(([imageURL, rest]) => {
        this.setState({
          user: this.props.userData ? this.props.userData : {},
          event: { ...rest, imageURL },
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
    this.props.userData &&
      this.props.userData?.type === USER_TYPES.trainer &&
      this.props.userData?.teamsIds.length &&
      firebase
        .firestore()
        .collection("teams")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "in",
          this.props.userData.teamsIds
        )
        .get()
        .then((docs) => {
          const teams = docs.docs.map((doc) => ({
            label: doc.data().name,
            value: doc.id,
          }));
          this.setState({
            myTeams: teams,
          });
        })
        .catch(console.error);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.sports && this.state.sports) {
    }
  }

  pushIdToHistory = (id) => {
    this.props.history.push(HOME);
  };

  tableHeaders = () => {
    if (this.state.event.type === "team") {
      return ["Team name", ""];
    } else {
      return ["Name", "Sport", ""];
    }
  };

  tableTemplate = (row) => {
    if (this.state.event.type === "team") {
      return (
        <TableItem key={row.id}>
          {row.name || "Brak"}
          <DropdownButton>
            <Link to={TEAM(row.id)}>View</Link>
          </DropdownButton>
        </TableItem>
      );
    } else {
      return (
        <TableItem key={row.id}>
          {`${row.name} ${row.surname}`}
          <DropdownButton>
            <Link to={USER(row.id)}>View</Link>
          </DropdownButton>
        </TableItem>
      );
    }
  };

  onSelectChange = (property) => (data) => {
    this.setState({ [property]: data.value });
  };

  toggleShowModal = () =>
    this.props.userData.type === USER_TYPES.sportsman
      ? this.setState({
          showModal: !this.state.showModal,
          noticeId: this.props.userData.id,
        })
      : this.setState({ showModal: !this.state.showModal });

  checkIfCanSignUp = () => {
    if (
      this.props.userData &&
      this.state.event &&
      this.props.userData.type === USER_TYPES.sportsman &&
      this.state.event.type === "solo"
    ) {
      return true;
    } else if (
      this.props.userData &&
      this.state.event &&
      this.props.userData.type === USER_TYPES.trainer &&
      this.state.event.type === "team"
    ) {
      return true;
    } else return false;
  };

  addNewNoticeToEvent = () => {
    this.state.event.applications.find((id) => this.state.noticeId === id)
      ? console.log("You signed up for this before")
      : this.addNotice();
  };

  addNotice = () => {
    firebase
      .firestore()
      .collection("events")
      .doc(this.props.match.params.eventId)
      .update({
        applications: [...this.state.event.applications, this.state.noticeId],
      });
    this.toggleShowModal();
  };

  render() {
    this.state.sports?.find((sport) => {
      return sport.value === this.props.userData.sportId;
    });
    return (
      <main>
        {this.state.showModal && (
          <SignUpModal
            onCloseClick={this.toggleShowModal}
            header={"Sign up for event"}
            buttons={
              <DarkButton
                disabled={!this.state.noticeId.length}
                onClick={() => this.addNewNoticeToEvent()}
              >
                Sign up
              </DarkButton>
            }
          >
            {this.props.userData.type === USER_TYPES.sportsman ? (
              "Do you want to sign up for this event? By clicking button below you will notice the event holder about your willingness"
            ) : (
              <div>
                Choose the team you want to sign up with:
                <Select
                  options={this.state.myTeams}
                  onChange={(data) => this.onSelectChange("noticeId")(data)}
                />
                By clicking button below you will notice the event holder about
                your willingness to participate in this event with chosen team.
              </div>
            )}
          </SignUpModal>
        )}
        <TitleWithButtons
          title={this.state.event?.name || ""}
          buttons={
            this.checkIfCanSignUp() ? (
              <DarkButton onClick={() => this.toggleShowModal()}>
                Sign up for event
              </DarkButton>
            ) : (
              ""
            )
          }
        />
        <EventLayout
          event={this.state.event}
          sports={this.props.sports}
          participants={this.state.participants}
          template={this.tableTemplate}
          headers={this.tableHeaders()}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
