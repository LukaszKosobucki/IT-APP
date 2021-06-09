import React from "react";
import classnames from "classnames";
import styles from "./Inputs.module.css";

export const Input = (props) => (
  <div className={classnames({ [styles.flex]: props.inline })}>
    <label className={classnames(styles.label, props.labelStyle)}>
      {props.label}
    </label>
    <input
      disabled={props.disabled}
      onChange={(event) => props.onChange(event)}
      type={props.type}
      placeholder={props.placeholder}
      className={`${props.className} ${styles.input}`}
      defaultValue={props.defaultValue}
      value={props.value}
      onBlur={props.onBlur}
      accept={props.accept}
      required={props.required}
    />
  </div>
);

export const Textarea = (props) => (
  <div>
    <label className={classnames(styles.label, props.labelStyle)}>
      {props.label}
    </label>
    <textarea
      disabled={props.disabled}
      onChange={(event) => props.onChange(event)}
      type={props.type}
      placeholder={props.placeholder}
      className={`${props.className} ${styles.textarea}`}
      defaultValue={props.value ? props.value : ""}
    />
  </div>
);

export const TimeInput = ({ date, value, onChange }) => (
  <input
    value={value}
    onChange={(event) => onChange(event.target.value)}
    className={classnames(styles.input, styles.timeInput)}
  />
);
