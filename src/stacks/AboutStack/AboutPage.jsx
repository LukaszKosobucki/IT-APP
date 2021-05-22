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
                <p>
                    this app is about this and that
                </p>
                <Button onClick={this.goSignUp} >Sign up</Button>
            </div>

        )
    }
}

export default AboutPage;