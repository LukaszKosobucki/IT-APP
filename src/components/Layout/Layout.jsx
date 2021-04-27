import React from "react";
import styles from "./Layout.module.css";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { connect } from "react-redux";

const Layout = (props) => (
  <div className={styles.layout}>
    <Sidebar isAuthorized={props.userData}>
      <Navbar />
      <div className={styles.content}>{props.children}</div>
    </Sidebar>
  </div>
);

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps)(Layout);
