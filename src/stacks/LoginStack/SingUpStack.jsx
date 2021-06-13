import React, { Component } from "react";
import styles from "./Page.module.css";
import { Link } from "react-router-dom";
import { LOGIN } from "../../constants/paths";
import firebase from "firebase/app";
import { USER_TYPES } from "../../constants/userTypes";

class SignUpPage extends Component {
  state = {
    email: "",
    password: "",
    passwordRepeat: "",
    affiliation: "",
  };

  onChangeHandler = (property) => (event) =>
    this.setState({
      [property]: event.target.value,
    });

  createUserWithEmailAndPasswordHandler = (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.passwordRepeat) {
      console.log("wrong pw");
      return;
    }
    let newUserData = {};
    if (this.state.affiliation === USER_TYPES.sportsman) {
      newUserData = {
        avatar: "default/user.png",
        description: "",
        email: this.state.email,
        level: "",
        name: this.state.name,
        surname: this.state.surname,
        sportId: "",
        teamsIds: [],
        type: USER_TYPES.sportsman,
      };
    } else if (this.state.affiliation === USER_TYPES.trainer) {
      newUserData = {
        avatar: "default/user.png",
        description: "",
        email: this.state.email,
        name: this.state.name,
        surname: this.state.surname,
        teamsIds: [],
        type: USER_TYPES.trainer,
      };
    } else {
      newUserData = {
        avatar: "default/user.png",
        description: "",
        email: this.state.email,
        name: this.state.name,
        eventsIds: [],
        type: USER_TYPES.organizer,
        verified: false,
      };
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        console.log("Succesfully signed up " + userCredential.user.email);
        return firebase
          .firestore()
          .collection("users")
          .doc(userCredential.user.uid)
          .set(newUserData);
      })
      .catch((error) => {
        console.error(error.code + " " + error.message);
      });
  };
  render() {
    console.log(this.state);
    return (
      <main className={styles.loginContainer}>
        <form className={styles.centered_right}>
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
            <input
              type="password"
              className={styles.textInput}
              value={this.state.password}
              placeholder="Password"
              onChange={this.onChangeHandler("password")}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              className={styles.textInput}
              value={this.state.passwordRepeat}
              placeholder="Repeat password"
              onChange={this.onChangeHandler("passwordRepeat")}
            />
          </div>
          <div className={styles.formGroup}>
            <select
              name="affiliation"
              className={styles.textInput}
              value={this.state.affiliation}
              onChange={this.onChangeHandler("affiliation")}
            >
              <option value="affiliation">--Choose One--</option>
              <option value="sportsman">Sportsman</option>
              <option value="trainer">Trainer</option>
              <option value="organizer">Event Organizer</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <input
              pattern="[a-zA-Z]*"
              type="text"
              className={styles.textInput}
              value={this.state.name}
              placeholder="Name"
              onChange={this.onChangeHandler("name")}
            />
          </div>
          {this.state.affiliation !== USER_TYPES.organizer && (
            <div className={styles.formGroup}>
              <input
                pattern="[a-zA-Z]*"
                type="text"
                className={styles.textInput}
                value={this.state.surname}
                placeholder="Surname"
                onChange={this.onChangeHandler("surname")}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <Link to={LOGIN} className={styles.alink}>
              Already have an account? Sign In
            </Link>
            <button
              type="submit"
              className={styles.buttonInput}
              onClick={this.createUserWithEmailAndPasswordHandler}
            >
              Sign Up
            </button>
            <p />
          </div>
          <div className={styles.formGroup}></div>
        </form>
      </main>
    );
  }
}

export default SignUpPage;
