import React, { Component } from "react";
import styles from "./Page.module.css";
import firebase from "firebase/app";
import { LOGIN } from "../../constants/paths";
import { Link } from "react-router-dom";

class LostPasswordPage extends Component {
  state = {
    email: "",
  };

  onChangeHandler = (property) => (event) =>
    this.setState({
      [property]: event.target.value,
    });

  sendPasswordResetEmail = (event) => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        console.log("Succesfully sent email to " + this.state.email);
      })
      .catch((error) => {
        console.error(error.code + " " + error.message);
      });
  };
  render() {
    return (
      <form className={styles.centered}>
        <div className={styles.formGroup}>
          <label className={styles.alink}>Enter e-mail adress on which you want to restore password</label>
          <input
            type="email"
            className={styles.textInput}
            value={this.state.email}
            placeholder="E-mail"
            onChange={this.onChangeHandler("email")}
          />
        </div>
        <div className={styles.formGroup}>
          <Link to={LOGIN} className={styles.alink}>Back to Login</Link>
          <button
            type="submit"
            className={styles.buttonInput}
            onClick={this.sendPasswordResetEmail}
          >
            Submit
          </button>
          <p />
        </div>
      </form>
    );
  }
}

export default LostPasswordPage;
