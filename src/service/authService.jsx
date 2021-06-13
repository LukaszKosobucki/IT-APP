import React, { Component } from "react";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { setUserData } from "../store/actions";
import { logNetworkError } from "../utils/error";

class AuthService extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.unsubscribe = firebase
      .auth()
      .onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.unsubscribe();
    if (user) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((user) => {
          return Promise.all([
            user.data().avatar &&
              firebase.storage().ref(user.data().avatar).getDownloadURL(),
            user.data(),
            user.id,
          ]);
        })
        .then(([avatarURL, user, id]) => {
          this.props.setUserData({ ...user, avatarURL, id });
          this.setState({ loading: false });
        })
        .catch(logNetworkError);
    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return this.state.loading ? <div /> : this.props.children;
  }
}

const mapDispatchToProps = {
  setUserData,
};

export default connect(null, mapDispatchToProps)(AuthService);
