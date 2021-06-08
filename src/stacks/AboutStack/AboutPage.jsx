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
                        <li>Karolina Bożek</li>
                        <li>Luís Sousa Rêgo</li>
                        <li>Łukasz Kosobucki</li>
                        <li>Paweł Wojtkowiak</li>
                        <li>Mikołaj Gromadzik</li>
                    </ul>
                    <h3></h3>

                </div>
                <div>
                    <h2>Sport Event Application</h2>
                    <p>
                        Application is meant to help with organization of any of the types of sport events.
                        There are many sports available and you can select any you want.
                        One of most important functionalities is auto genereting of a event ladder.
                        Users can register as trainers, sportsmans and organizatiors.
                        Each of them has different features available - starting with managing your own profie through managing your team and finishing with managing whole sport event!
                        Do not waste more time or energy! Let the application help you.
                        Try it now!
                </p>
                </div>

                <Button onClick={this.goSignUp} >Sign up</Button>
            </div>

        )
    }
}

export default AboutPage;