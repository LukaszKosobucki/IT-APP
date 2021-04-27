import React from "react";
import classnames from "classnames";
import styles from "./Sidebar.module.css";
import Drawer from "./Drawer/Drawer";

const Sidebar = (props) => {
  return (
    <div className={styles.sidebarWrapper}>
      {props.isAuthorized && <Drawer />}
      <div
        className={classnames(styles.contentWrapper, {
          [styles.fullWidth]: !props.isAuthorized,
        })}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Sidebar;
