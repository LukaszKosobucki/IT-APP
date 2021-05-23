import React, { Component } from "react";
import styles from "./AboutPage.module.css";
import { Button } from "../../components/shared/Buttons/Buttons";
import { SIGN_UP } from "../../constants/paths";
class AboutPage extends Component {

    goSignUp = () => {
        this.props.history.push(SIGN_UP)
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>About</h1>
                <div>
                    <h2>Our team</h2>
                    <h3>Members:</h3>
                    <ul>
                        <li>Jakub Majda</li>
                        <li>Karolina Bożek</li>
                        <li>Luís Sousa Rêgo</li>
                        <li>Łukasz Brzeszcz</li>
                        <li>Łukasz Kosobucki</li>
                        <li>ŁPaweł Wojtkowiak</li>
                        <li>Mikołaj Gromadzik</li>
                    </ul>
                    <h3></h3>

                </div>
                <div>
                    <h2>Our app</h2>
                    <p>
                        this app is about this and that
                </p>
                </div>

                <Button onClick={this.goSignUp} >Sign up</Button>
            </div>

        )
    }
}

export default AboutPage;