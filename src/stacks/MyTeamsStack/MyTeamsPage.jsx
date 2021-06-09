import { Component } from "react";
import { getMyTeams } from "../../store/actions/teams";
import { connect } from "react-redux";
import { Table } from "../../components/shared/Table/Table";
import firebase from "firebase";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import {
  DarkButton,
  DropdownButton,
} from "../../components/shared/Buttons/Buttons";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import { EVENT_ADD, TEAM, TEAM_ADD, TEAM_EDIT } from "../../constants/paths";
import { Link } from "react-router-dom";
import { getSports } from "../../store/actions/sports";
import { USER_TYPES } from "../../constants/userTypes";

class MyTeamsPage extends Component {
  state = {
    teams: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
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
          team: doc.data(),
          id: doc.id,
        }));
        this.setState({
          teams: teams,
        });
      })
      .catch(console.error);
  }

  tableTemplate = (row) => (
    <TableItem key={row.id}>
      {row.team.name || "Brak"}
      {
        this.props.sports?.find((sport) => sport.value === row.team.sportId)
          ?.label
      }
      <DropdownButton>
        <Link to={TEAM(row.id)}>View</Link>
        <Link to={TEAM_EDIT(row.id)}>Edit</Link>
      </DropdownButton>
    </TableItem>
  );

  render() {
    return (
      <main>
        <TitleWithButtons
          title={"Teams"}
          buttons={
            this.props.userData.type === USER_TYPES.trainer && (
              <Link to={TEAM_ADD}>
                <DarkButton>Add new</DarkButton>
              </Link>
            )
          }
        />
        {this.state.teams && (
          <Table
            headers={["Name", "Sport", ""]}
            data={this.state.teams}
            template={this.tableTemplate}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTeamsPage);
