import React, { Component } from 'react'
import styles from './LoginPage.module.css'

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
        };
    render() {
        return (
            <form className={styles.centered}>
                <h3>Log in</h3>
                <div className={styles.formGroup}>
                    <label>Email address</label>
                    <input type="email"
                        className={styles.textInput}
                        value={email}
                        placeholder="Enter email"
                        onChange={onChangeHandler("email")} />
                </div>
                <div className={styles.formGroup}>
                    <label>Password</label>
                    <input type="password"
                        className={styles.textInput}
                        value={email}
                        placeholder="Enter password"
                        onChange={onChangeHandler("password")} />
                </div>
                <div className={styles.formGroup}>
                    <input type="remember"
                        className={styles.checkboxInput}
                        value={remember}
                        onChange={onChangeHandler(remember)} />
                    <label htmlFor="userRemember">Remember me</label>
                </div>
                <div className={styles.formGroup}>
                    <button type="submit" className={styles.buttonInput}
                        onClick={signInWithEmailAndPasswordHandler}>
                        Submit
                        </button><p />
                </div>
                <div className={styles.formGroup}>
                    <Link to="#" className={styles.aright}>
                        Forgot password
                    </Link>
                    <Link to="#">
                        Sing up
                    </Link>
                </div >
            </form >
        )
    }
}

export default LoginPage;