import { Component } from "react";
import { connect } from "react-redux";
import { Table } from "../../components/shared/Table/Table";
import firebase from "firebase";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import {
  DarkButton,
  DropdownButton,
} from "../../components/shared/Buttons/Buttons";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import { EVENT, EVENT_ADD, EVENT_EDIT } from "../../constants/paths";
import { Link } from "react-router-dom";
import Moment from "moment";
import { getSports } from "../../store/actions/sports";

class MyEventsPage extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    firebase
      .firestore()
      .collection("events")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "in",
        this.props.userData.eventsIds
      )
      .get()
      .then((docs) => {
        const events = docs.docs.map((doc) => ({
          event: doc.data(),
          id: doc.id,
        }));
        this.setState({
          events,
        });
      })
      .catch(console.error);
  }

  tableTemplate = (row) => (
    <TableItem key={row.id}>
      {row.event.name || "Brak"}
      {Moment(row.event.startDate.toDate()).format("DD/MM/Y hh:mm")}
      {Moment(row.event.endDate.toDate()).format("DD/MM/Y hh:mm")}
      {
        this.props.sports.find((sport) => sport.value === row.event.sportId)
          .label
      }
      <DropdownButton>
        <Link to={EVENT(row.id)}>View</Link>
        <Link to={EVENT_EDIT(row.id)}>Edit</Link>
      </DropdownButton>
    </TableItem>
  );

  render() {
    return (
      <main>
        <TitleWithButtons
          title={"Events"}
          buttons={
            <Link to={EVENT_ADD}>
              <DarkButton>Add new</DarkButton>
            </Link>
          }
        />
        {this.state.events && (
          <Table
            headers={["Name", "Start", "End", "Sport", ""]}
            data={this.state.events}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyEventsPage);
