import React, { Component } from "react";
import { connect } from "react-redux";
import { HOME, MY_TEAMS } from "../../constants/paths";
import { getSports } from "../../store/actions/sports";
import TitleWithButtons from "../../components/shared/TitleWithButtons/TitleWithButtons";
import TeamForm from "../../components/TeamForm/TeamForm";
import { addImageToStorage, removeImageFromStorage } from "../../utils/files";
import {
  addNewTeam,
  editTeam,
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

  hasChanges = () => {
    return (
      this.state.image.new ||
      this.state.team.name !== this.state.name ||
      this.state.team.description !== this.state.description ||
      this.state.team.sportId !== this.state.sportId ||
      this.state.team.level !== this.state.level ||
      this.state.team.level !== this.state.level
    );
  };

  onAccept = (event) => {
    event.preventDefault();
    this.props.match.params.teamId ? this.editTeam() : this.addTeam();
    this.props.history.push(MY_TEAMS);
  };

  addTeam = () => {
    const newTeam = {
      description: this.state.description,
      name: this.state.name,
      image: "",
      level: this.state.level,
      sportId: this.state.sportId,
      trainerId: this.props.userData.id,
      sportsmansIds: [],
    };
    addNewTeam(newTeam, this.state.image.new);
  };

  editTeam = () => {
    let newTeam = {
      description: this.state.description,
      name: this.state.name,
      image: this.state.team.image,
      level: this.state.level,
      sportId: this.state.sportId,
      trainerId: this.props.userData.id,
      sportsmansIds: this.state.sportsmansIds,
    };
    if (this.state.image.new && this.state.image.old) {
      removeImageFromStorage(this.state.team.image);
    }
    if (this.state.image.new) {
      newTeam.image = addImageToStorage(
        `team/${this.state.id}`,
        this.state.image.new
      );
    }
    editTeam(this.state.id, newTeam);
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
          hasChanges={this.hasChanges()}
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
