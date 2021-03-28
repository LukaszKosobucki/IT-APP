import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { LOGIN } from "../constants/paths";

const withAuth = (Component, props = null) => {
  class WithAuth extends React.Component {
    componentDidMount() {
      this.redirectIfNoAuth();
    }

    componentDidUpdate() {
      this.redirectIfNoAuth();
    }

    redirectIfNoAuth() {
      if (!this.props.userData) {
        this.props.history.replace(LOGIN);
      }
    }

    render() {
      return this.props.userData && <Component {...this.props} {...props} />;
    }
  }

  const mapStateToProps = (state) => ({
    userData: state.auth.userData,
  });

  return withRouter(connect(mapStateToProps)(WithAuth));
};

export default withAuth;
