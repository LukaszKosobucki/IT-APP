import React, { Component } from "react";
import { connect } from "react-redux";
import { TEAM, HOME, USER } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import {} from "../../store/actions/events";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import EventLayout from "../../components/EventLayout/EventLayout";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import Moment from "moment";
import { DropdownButton } from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import TeamLayout from "../../components/TeamLayout/TeamLayout";
import {
  getTeam,
  getTeamMembers,
  getTeamMembersImages,
} from "../../store/actions/teams";

class UserAdmin extends Component {
  state = {
    team: {},
    teamMembers: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    getTeam(this.props.match.params.teamId)
      .then(([imageURL, rest]) => {
        this.setState({
          user: this.props.userData,
          team: { ...rest, imageURL },
        });
        return getTeamMembers(rest.sportsmansIds);
      })
      .then((docs) => {
        const teamMembers = docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        return getTeamMembersImages(teamMembers);
      })
      .then((members) =>
        this.setState({
          teamMembers: members,
        })
      );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.teamMembers && this.state.teamMembers) {
    }
  }

  pushIdToHistory = (id) => {
    this.props.history.push(HOME);
  };

  render() {
    console.log(this.state);
    this.state.sports?.find((sport) => {
      return sport.value === this.props.userData.sportId;
    });
    return (
      <main>
        <TitleWithButtons title={this.state.team?.name || ""} />
        <TeamLayout
          team={this.state.team}
          sports={this.props.sports}
          teamMembers={this.state.teamMembers}
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
