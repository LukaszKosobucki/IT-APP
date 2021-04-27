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
        <h3>Forgot your password?</h3>
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
          <button
            type="submit"
            className={styles.buttonInput}
            onClick={this.sendPasswordResetEmail}
          >
            Submit
          </button>
          <p />
        </div>
        <div className={styles.formGroup}>
          <Link to={LOGIN}>Back to Login</Link>
        </div>
      </form>
    );
  }
}

export default LostPasswordPage;
