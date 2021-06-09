import React from "react";

import styles from "./TitleWithButtons.module.css";

const TitleWithButtons = (props) => (
  <div className={styles.container}>
    <div className={styles.title}>{props.title}</div>
    <div className={styles.container}>{props.buttons}</div>
  </div>
);

export default TitleWithButtons;
