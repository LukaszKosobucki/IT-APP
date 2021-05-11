import React, { Component } from "react";
import { useHistory } from "react-router-dom";

class SuccessPage extends Component {
    state = { message: ""}

    componentDidMount() {
        this.setState({message: this.props.location.state.message})
    }

    render() {
        return (
            <div>
                <h1>
                    Success! :)
                </h1>
                <p>{this.state.message}</p>
            </div>

        )
    }

}

export default SuccessPage;

