import React from "react";
import classnames from "classnames";
import styles from "./Drawer.module.css";
import { NavLink } from "react-router-dom";

const drawerElement = ({ path, text, full }) => (
  <NavLink
    to={path}
    activeClassName={styles.active}
    className={classnames(styles.navLink, { [styles.centered]: !full })}
  >
    {text}
  </NavLink>
);

export default drawerElement;
