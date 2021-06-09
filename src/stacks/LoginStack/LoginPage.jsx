import React, { Component } from "react";
import styles from "./Page.module.css";
import { Link } from "react-router-dom";
import { SIGN_UP, LOST_PASS, MY_ACCOUNT } from "../../constants/paths";
import firebase from "firebase/app";
import { connect } from "react-redux";
import { setUserData } from "../../store/actions";
import { fetchUserData } from "../../store/actions/auth";

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  onChangeHandler = (property) => (event) =>
    this.setState({
      [property]: event.target.value,
    });

  signInWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      const result = await fetchUserData(user.uid);
      console.log(result.data());
      const avatarURL =
        result.data().avatar &&
        (await firebase.storage().ref(result.data().avatar).getDownloadURL());
      const userData = { ...result.data(), id: user.uid, avatarURL };
      this.props.setUserData(userData);
      console.log("Succesfully logger " + userData.email);
      this.props.history.push(MY_ACCOUNT);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <main className={styles.loginContainer}>
        <form className={styles.centered_left}>
          <div className={styles.formGroup}>
            <input
              type="email"
              className={styles.textInput}
              value={this.state.email}
              placeholder="E-mail"
              onChange={this.onChangeHandler("email")}
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <Link to={LOST_PASS} className={styles.alink}>
                Forgot password
              </Link>
            </label>
            <input
              type="password"
              className={styles.textInput}
              value={this.state.password}
              placeholder="Password"
              onChange={this.onChangeHandler("password")}
            />
          </div>
          <div className={styles.formGroup}>
            <Link to={SIGN_UP} className={styles.alink}>
              Sing up
            </Link>
            <button
              type="submit"
              className={styles.buttonInput}
              onClick={this.signInWithEmailAndPasswordHandler}
            >
              Sign In
            </button>
            <p />
          </div>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
