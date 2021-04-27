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
