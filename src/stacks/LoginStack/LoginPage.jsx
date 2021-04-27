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

  signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        return fetchUserData(userCredential.user.uid);
      })
      .then((doc) => {
        this.props.setUserData(doc.data());
        console.log("Succesfully logger " + doc.data().email);
        this.props.history.push(MY_ACCOUNT);
      })
      .catch((error) => {
        console.error(error.code + " " + error.message);
      });
  };

  render() {
    return (
      <form className={styles.centered}>
        <h3>Log in</h3>
        <div className={styles.formGroup}>
          <label>Email address</label>
          <input
            type="email"
            className={styles.textInput}
            value={this.state.email}
            placeholder="Enter email"
            onChange={this.onChangeHandler("email")}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            className={styles.textInput}
            value={this.state.password}
            placeholder="Enter password"
            onChange={this.onChangeHandler("password")}
          />
        </div>
        <div className={styles.formGroup}>
          <button
            type="submit"
            className={styles.buttonInput}
            onClick={this.signInWithEmailAndPasswordHandler}
          >
            Submit
          </button>
          <p />
        </div>
        <div className={styles.formGroup}>
          <Link to={LOST_PASS} className={styles.aright}>
            Forgot password
          </Link>
          <Link to={SIGN_UP}>Sing up</Link>
        </div>
      </form>
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
