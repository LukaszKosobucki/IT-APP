import React, { Component } from "react";
import { connect } from "react-redux";
import AccountLayout from "../../components/AccountLayout/AccountLayout";
import { HOME } from "../../constants/paths";
import { USER_TYPES } from "../../constants/userTypes";
import { getSports } from "../../store/actions/sports";

class UserAdmin extends Component {
  state = {
    name: "",
    surname: "",
    mail: "",
    avatar: "",
    sports: [],
  };

  componentDidMount() {
    !this.props.sports && this.props.getSports();
    this.setState({
      ...this.props.userData,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.sports && this.state.sports) {
    }
  }

  pushIdToHistory = (id) => {
    this.props.history.push(HOME);
  };

  render() {
    this.state.sports?.find((sport) => {
      return sport.value === this.props.userData.sportId;
    });
    return (
      <main>
        <AccountLayout
          userData={this.props.userData}
          sports={this.props.sports}
        />
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  sports: state.sport.sports,
});

const mapDispatchToProps = {
  getSports,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
