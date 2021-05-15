import React, { Component } from "react";
import styles from "./FailurePage.module.css";

class FailurePage extends Component {
    state = { message: ""}

    componentDidMount() {
        this.setState({message: this.props.location.state?.message ?? ""})
    }

    render() {
        return (
            <div className={styles.container}>
                <h1>
                    Failure :(
                </h1>
                <p>{this.state.message}</p>
            </div>

        )
    }

}

export default FailurePage;