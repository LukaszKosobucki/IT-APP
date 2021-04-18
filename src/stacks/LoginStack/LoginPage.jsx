import React, { Component } from 'react';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { SIGN_UP, LOST_PASS } from '../../constants/paths';
import { auth } from '../../firebase/config'

class LoginPage extends Component {
    state = {
        email: "",
        password: "",
    }

    onChangeHandler = (property) => (event) => this.setState({
        [property]: event.target.value
    })

    signInWithEmailAndPasswordHandler =
        (event) => {
            event.preventDefault();
            //tu po prostu używasz danych ze state przez odwołanie się do nich przez np this.state.email
            auth.signInWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredential) => {
                    // Signed in
                    console.log("Succesfully logger " + userCredential.user.email);
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + " " + errorMessage);
                });
        };
    render() {
        return (
            <form className={styles.centered}>
                <h3>Log in</h3>
                <div className={styles.formGroup}>
                    <label>Email address</label>
                    <input type="email"
                        className={styles.textInput}
                        value={this.state.email}
                        placeholder="Enter email"
                        onChange={this.onChangeHandler("email")} />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password"
                        className={styles.textInput}
                        value={this.state.password}
                        placeholder="Enter password"
                        onChange={this.onChangeHandler("password")} />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.buttonInput}
                        onClick={this.signInWithEmailAndPasswordHandler}>
                        Submit
                        </button><p />
                </div>
                <div className={styles.formGroup}>
                    <Link to={LOST_PASS} className={styles.aright}>
                        Forgot password
                    </Link>
                    <Link to={SIGN_UP}>
                        Sing up
                    </Link>
                </div >
            </form >
        )
    }
}

export default LoginPage;