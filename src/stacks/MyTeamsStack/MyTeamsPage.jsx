import { Component } from "react";
import { getMyTeams } from "../../store/actions/myTeams";
import firebase from "firebase";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>name</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  console.log(props.data);
  const rows = props.data.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = (props) => {
  const { data } = props;

  return (
    <table>
      <TableHeader />
      <TableBody data={data} />
    </table>
  );
};

class MyTeamsPage extends Component {
  state = {
    teams: [],
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("teams")
      .get()
      .then((docs) => {
        const teams = docs.docs.map((doc) => ({
          team: doc.data(),
        }));
        this.setState({
          teams: teams,
        });
      })
      .catch(console.error);
  }

  render() {
    console.log(this.state.teams);
    return (
      <form>
        <div>MyTeams</div>
        {this.state.teams && <Table data={this.state.teams} />}
      </form>
    );
  }
}

export default MyTeamsPage;
