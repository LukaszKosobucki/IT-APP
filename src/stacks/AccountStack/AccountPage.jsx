import React, { Component } from "react";
import { connect } from "react-redux";
import AccountLayout from "../../components/AccountLayout/AccountLayout";
import { HOME, TEAM } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import { Table } from "../../components/shared/Table/Table";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import { DropdownButton } from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { getApplicated } from "../../store/actions/teams";
import firebase from "firebase";
import { logNetworkError } from "../../utils/error";

class UserAdmin extends Component {
  state = {
    name: "",
    surname: "",
    mail: "",
    avatar: "",
    sports: [],
    applicationTeams: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    this.setState({
      ...this.props.userData,
    });
    getApplicated(this.props.userData.applications).then((teams) =>
      this.setState({
        applicationTeams: teams.map((team) => ({
          ...team.data(),
          id: team.id,
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

  onAcceptApp = (teamId) => {
    const cpApplications = [...this.state.applications];
    cpApplications.splice(
      cpApplications.findIndex((id) => id === teamId),
      1
    );
    const cpTeams = [...this.state.applicationTeams];
    const removedMember = cpTeams.splice(
      cpTeams.findIndex((id) => id.id === teamId),
      1
    );
    firebase
      .firestore()
      .collection("teams")
      .doc(teamId)
      .update({
        sportsmansIds: [
          ...removedMember[0].sportsmansIds,
          this.props.userData.id,
        ],
      })
      .then(() => {
        return firebase
          .firestore()
          .collection("users")
          .doc(this.props.userData.id)
          .update({
            applications: cpApplications,
            teamsIds: [...this.props.userData.teamsIds, teamId],
          });
      })
      .catch(logNetworkError);
  };

  onRejectApp = (teamId) => {
    const cpApplications = [...this.state.applications];
    cpApplications.splice(
      cpApplications.findIndex((id) => id === teamId),
      1
    );
    firebase
      .firestore()
      .collection("users")
      .doc(this.props.userData.id)
      .update({
        applications: cpApplications,
      });
  };

  template = (row) => (
    <TableItem key={row.id}>
      {`${row.name}` || "Brak"}
      <DropdownButton>
        <Link to={TEAM(row.id)}>View</Link>
        <a onClick={() => this.onAcceptApp(row.id)}>Accept</a>
        <a onClick={() => this.onRejectApp(row.id)}>Reject</a>
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
        <AccountLayout
          userData={this.props.userData}
          sports={this.props.sports}
        />
        {this.props.userData.applications && (
          <Table
            data={this.state.applicationTeams}
            headers={["Team name", ""]}
            template={this.template}
          />
        )}
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
