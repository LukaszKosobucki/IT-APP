// import React from "react";

// import Calendar from "../../components/Calendar";

// import "./css/HomePage.css"
// import { getEvents} from "../../store/actions/events"

// class HomePage extends React.Component {
//     state={
//         events: []
//     }

//     componentDidMount() {
//         const events = getEvents();
//         this.setState({
//           events: events,
//         });
//     }

//   render() {
//     return (
//       <div className="HomePage">
//         <main>
//           <Calendar events={this.state.events}/>
//         </main>
//       </div>
//     );
//   }
// }

// export default HomePage;
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

class HomePage extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    firebase
      .firestore()
      .collection("events")
      .orderBy('endDate')
      .startAt(new Date())
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
  // .where(
  //   firebase.firestore.FieldPath.documentId(),
  //   "in",
  //   this.props.userData.eventsIds
  // )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
