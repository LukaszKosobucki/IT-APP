import React from "react";
import styles from "./Buttons.module.css";

export const Button = (props) => (
  <button
    {...props}
    onClick={props.onClick}
    className={`${styles.button} ${props.className}`}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export const DarkButton = (props) => (
  <Button {...props} className={`${styles.darkButton} ${props.className}`}>
    {props.children}
  </Button>
);

export const DropdownButton = (props) => (
  <div className={styles.downdrop}>
    <Button
      {...props}
      className={`${styles.downdropButton} ${props.className}`}
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </Button>
    <div className={styles.dropdownContent}>{props.children}</div>
  </div>
);
