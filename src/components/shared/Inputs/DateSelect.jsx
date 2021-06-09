import React from "react";
import DatePicker from "react-datepicker";
import styles from "./Inputs.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { TimeInput } from "./Inputs";

export const CustomDatePicker = (props) => (
  <div className={styles.datePicker}>
    <label className={styles.label}>{props.label}</label>
    <DatePicker
      isClearable={!props.disabled}
      disabled={props.disabled}
      onChange={(event) => props.onChange(event)}
      type={props.type}
      placeholder={props.placeholder}
      selected={props.selected}
      dateFormat={"dd.MM.yyyy hh:mm"}
      className={`${props.className} ${styles.input}`}
      showTimeInput
      customTimeInput={<TimeInput />}
    />
  </div>
);
