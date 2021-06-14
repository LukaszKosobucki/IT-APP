import styles from "./Table.module.css";

const TableHeader = ({ headers }) => {
  return (
    <thead>
      <tr className={styles.tableHeader}>
        {headers.map((header) => (
          <td key={header}>{header}</td>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  return <tbody>{props.data.map(props.template)}</tbody>;
};

export const Table = (props) => {
  return (
    <table className={styles.table}>
      <TableHeader headers={props.headers} />
      <TableBody data={props.data} template={props.template} />
    </table>
  );
};
