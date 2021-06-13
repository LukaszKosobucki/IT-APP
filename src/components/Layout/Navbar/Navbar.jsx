import React from "react";
import styles from "./Navbar.module.css";
import { connect } from "react-redux";
import { logOut } from "../../../store/actions/auth";
import { ABOUT, HOME, LOGIN } from "../../../constants/paths";
import { withRouter } from "react-router-dom";
import { Button } from "../../shared/Buttons/Buttons";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../../static/images/Logo.svg";

const NavBar = (props) => {
  const LogOutOnClick = () => {
    props.logOut();
    props.history.push(HOME);
  };

  return (
    <div className={styles.navbar}>
      <NavLink to={HOME} className={styles.logo}>
        <Logo />
      </NavLink>
      <NavLink to={ABOUT} className={styles.link}>
        About
      </NavLink>
      <Button
        className={styles.logoutButton}
        onClick={
          props.userData
            ? () => LogOutOnClick()
            : () => props.history.push(LOGIN)
        }
      >
        {props.userData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
