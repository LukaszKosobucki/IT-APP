import React, { Component } from "react";
import { useLocation } from "react-router-dom";

class FailurePage extends Component {
    state = { message: ""}

    componentDidMount() {
        this.setState({message: this.props.location.state.message})
    }

    render() {
        return (
            <div>
                <h1>
                    Failure :(
                </h1>
                <p>{this.state.message}</p>
            </div>

        )
    }

}

export default FailurePage;