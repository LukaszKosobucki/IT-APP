import React, { Component } from "react";
import { connect } from "react-redux";
import AccountLayout from "../../components/AccountLayout/AccountLayout";
import { HOME } from "../../constants/paths";
import { USER_TYPES } from "../../constants/userTypes";
import { getSports } from "../../store/actions/sports";
import { fetchUserData } from "../../store/actions/auth";
import firebase from "firebase";
import { logNetworkError } from "../../utils/error";

class UserPage extends Component {
  state = {
    name: "",
    surname: "",
    mail: "",
    avatar: "",
    sports: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    fetchUserData(this.props.match.params.userId)
      .then((user) => {
        return Promise.all([
          user.data().avatar &&
            firebase.storage().ref(user.data().avatar).getDownloadURL(),
          user.data(),
        ]);
      })
      .then(([avatarURL, user]) => {
        this.setState({ ...user, avatarURL });
      })
      .catch(logNetworkError);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.sports && this.state.sports) {
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
        <AccountLayout
          userData={this.state}
          sports={this.props.sports}
          noButton
        />
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  sports: state.sport.sports,
});

const mapDispatchToProps = {
  getSports,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
