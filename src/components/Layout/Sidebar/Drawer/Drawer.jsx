import React from "react";
import classnames from "classnames";
import styles from "./Drawer.module.css";
import { MY_EVENTS, MY_ACCOUNT, MY_TEAMS } from "../../../../constants/paths";
import DrawerItem from "./DrawerItem";

const drawer = (props) => {
  const elements = [
    { name: "My events", path: MY_EVENTS },
    { name: "My teams", path: MY_TEAMS },
    { name: "My account", path: MY_ACCOUNT },
  ];
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
