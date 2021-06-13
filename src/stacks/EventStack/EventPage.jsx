import React, { Component } from "react";
import { connect } from "react-redux";
import { TEAM, HOME, USER } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import { getEvent, getParticipantsForEvent } from "../../store/actions/events";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import EventLayout from "../../components/EventLayout/EventLayout";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import Moment from "moment";
import {
  DarkButton,
  DropdownButton,
} from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { EVENT_TYPE_FOR_SELECT, USER_TYPES } from "../../constants/userTypes";

class UserAdmin extends Component {
  state = {
    event: {},
    participants: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    getEvent(this.props.match.params.eventId)
      .then(([imageURL, rest]) => {
        this.setState({
          user: this.props.userData,
          event: { ...rest, imageURL },
        });
        return getParticipantsForEvent(rest.participantsIds, "teams");
      })
      .then((docs) => {
        const participants = docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(participants);
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

  checkIfCanSignUp = () => {
    if (
      (this.props.userData.type === USER_TYPES.sportsman &&
        this.state.event.type === "solo") ||
      (this.props.userData.type === USER_TYPES.trainer &&
        this.state.event.type === "team")
    ) {
      return true;
    } else return false;
  };

  render() {
    console.log(this.state);
    this.state.sports?.find((sport) => {
      return sport.value === this.props.userData.sportId;
    });
    return (
      <main>
        <TitleWithButtons
          title={this.state.event?.name || ""}
          buttons={
            this.checkIfCanSignUp() ? (
              <DarkButton>Sign up for event</DarkButton>
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
