import React from "react";
import classnames from "classnames";
import styles from "./Drawer.module.css";
import {
  MY_EVENTS,
  MY_ACCOUNT,
  MY_TEAMS,
  HOME,
} from "../../../../constants/paths";
import DrawerItem from "./DrawerItem";
import { USER_TYPES } from "../../../../constants/userTypes";

const drawer = (props) => {
  const elements = [
    { name: "All events", path: HOME },
    { name: "My account", path: MY_ACCOUNT },
  ];
  {
    props.role === USER_TYPES.organizer &&
      elements.unshift({ name: "My events", path: MY_EVENTS });
    props.role === USER_TYPES.trainer &&
      elements.unshift({ name: "My teams", path: MY_TEAMS });
  }
  const drawerElements = elements.map((element) => (
    <DrawerItem path={element.path} text={element.name} key={element.name} />
  ));
  return (
    <div className={classnames(styles.sidebar, styles.paddingTop)}>
      <nav className={styles.sidebar}>{drawerElements}</nav>
    </div>
  );
};

export default drawer;
