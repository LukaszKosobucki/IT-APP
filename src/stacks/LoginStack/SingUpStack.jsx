import React, { Component } from 'react';
import styles from './Page.module.css';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../constants/paths';
import { auth } from '../../firebase/config'

class SignUpPage extends Component {
    state = {
        email: "",
        password: "",
        passwordRepeat: "",
    }

    onChangeHandler = (property) => (event) => this.setState({
        [property]: event.target.value
    })

    createUserWithEmailAndPasswordHandler =
        (event) => {
            event.preventDefault();
            if (this.state.password !== this.state.passwordRepeat)
            {
                console.log("wrong pw");
                return;
            }
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((userCredential) => {
                    console.log("Succesfully signed up " + userCredential.user.email);
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
                <h3>Sing up</h3>
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
                    <label>Repeat password</label>
                    <input type="password"
                        className={styles.textInput}
                        value={this.state.passwordRepeat}
                        placeholder="Enter password"
                        onChange={this.onChangeHandler("passwordRepeat")} />
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.buttonInput}
                        onClick={this.createUserWithEmailAndPasswordHandler}>
                        Submit
                        </button><p />
                </div>
                <div className={styles.formGroup}>
                    <Link to={LOGIN}>
                        Already have an account? Log in
                    </Link>
                </div >
            </form >
        )
    }
}

export default SignUpPage;