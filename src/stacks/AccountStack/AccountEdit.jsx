import React, { Component } from "react";
import { connect } from "react-redux";
import UserLayout from "../../components/AccountForm/AccountForm";
import { HOME, MY_ACCOUNT } from "../../constants/paths";
import { addImageToStorage, removeImageFromStorage } from "../../utils/files";
import { getSports } from "../../store/actions/sports";

class UserAdmin extends Component {
  state = {
    name: "",
    surname: "",
    mail: "",
    avatar: { new: "", old: "" },
    description: "",
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    this.setState({
      ...this.props.userData,
      avatar: {
        old: this.props.userData.avatarURL || null,
        new: "",
      },
    });
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

  hasChanges = () => {
    // return false;
    return this.state.avatar.new
    || this.props.userData.name !== this.state.name
    || this.props.userData.description !== this.state.description

  }

  onCancel = () => this.props.history.push(MY_ACCOUNT);

  render() {
    return (
      <main>
        <UserLayout
          name={this.state.name}
          sportId={this.state.sportId}
          level={this.state.level}
          surname={this.state.surname}
          avatar={
            !this.state.avatar.new
              ? this.state.avatar.old
              : URL.createObjectURL(this.state.avatar.new)
          }
          onChange={this.onInputChange}
          hasChanges={this.hasChanges()}
          onSelectChange={this.onSelectChange}
          onFileChange={this.onFileInputChange}
          onAccept={this.onAccept}
          onCancel={this.onCancel}
          userData={this.props.userData}
          sports={this.props.sports}
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
