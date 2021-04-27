import React from "react";
import styles from "./Select.module.css";
import Select from "react-select";
import classnames from "classnames";

const customStyles = (inline) => ({
  control: (styles) => ({
    ...styles,
    border: "1px solid #e4e4e4",
    minWidth: "250px",
    fontSize: "19px",
    height: "40px",
    marginBottom: !inline ? "20px" : "auto",
    overflowY: "scroll",
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: "100",
  }),
});

const customSelect = ({
  label,
  options,
  multi,
  placeholder,
  defaultValue,
  onChange,
  disabled,
  inline,
  ...rest
}) => {
  return (
    <div className={classnames({ [styles.flex]: inline })}>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        isDisabled={disabled}
        styles={customStyles(inline)}
        isMulti={multi}
        options={options}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default customSelect;
