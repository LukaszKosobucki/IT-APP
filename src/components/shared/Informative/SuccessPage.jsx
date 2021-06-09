import React, { Component } from "react";
import styles from "./SuccessPage.module.css";
class SuccessPage extends Component {
    state = { message: ""}

    componentDidMount() {
        this.setState({message: this.props.location.state?.message ?? ""})
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>
                    Success! :)
                </h1>
                <p>{this.state.message}</p>
            </div>

        )
    }

}

export default SuccessPage;

