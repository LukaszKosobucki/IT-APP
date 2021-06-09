import React from "react";
import tableStyles from "../Table.module.css";

const TableItem = ({ children }) => {
  return (
    <tr className={tableStyles.tableRow}>
      {React.Children.map(children, (child, index) => (
        <td key={index}>{child}</td>
      ))}
    </tr>
  );
};

export default TableItem;
