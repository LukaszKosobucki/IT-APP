import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TEAM,
  HOME,
  USER,
  MY_ACCOUNT,
  MY_EVENTS,
  MY_TEAMS,
} from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import { getEvent, getParticipantsForEvent } from "../../store/actions/events";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import TeamForm from "../../components/TeamForm/TeamForm";
import TableItem from "../../components/shared/Table/TableItem/TableItem";
import Moment from "moment";
import { DropdownButton } from "../../components/shared/Buttons/Buttons";
import { Link } from "react-router-dom";
import { addImageToStorage, removeImageFromStorage } from "../../utils/files";
import {
  getTeam,
  getTeamMembers,
  getTeamMembersImages,
} from "../../store/actions/teams";

class TeamFormPage extends Component {
  state = {
    team: {},
    teamMembers: [],
    description: "",
    name: "",
    image: { new: "", old: "" },
    sportId: "",
    level: "",
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    this.props.match.params.teamId &&
      getTeam(this.props.match.params.teamId)
        .then(([imageURL, rest]) => {
          this.setState({
            user: this.props.userData,
            ...rest,
            image: { old: imageURL, new: "" },
            team: {
              ...rest,
            },
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

  hasChanges = () => () => {
    return false;
  }

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

  onCancel = () => this.props.history.push(MY_TEAMS);

  render() {
    console.log(this.state);
    this.state.sports?.find((sport) => {
      return sport.value === this.props.userData.sportId;
    });
    return (
      <main>
        <TitleWithButtons
          title={this.props.match.params.teamId ? "Edit team" : "Add team"}
        />
        <TeamForm
          team={this.state.team}
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
          hasChanges={this.hasChanges}
          onSelectChange={this.onSelectChange}
          sportId={this.state.sportId}
          level={this.state.level}
          onFileChange={this.onFileInputChange}
          name={this.state.name}
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamFormPage);
