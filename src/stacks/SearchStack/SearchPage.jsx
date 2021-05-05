import React, { Component } from "react";
import styles from "./SearchPage.module.css";

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  componentDidMount() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    this.setState({
      query,
      results: this.getResults()
    })
  }

  // TODO: implement search logic
  getResults() {
    // mock data for testing purposes
    return [
      { id: 1, title: 'search result 1 but longer title', status: 'open' },
      { id: 2, title: 'search result 2', status: 'closed' },
      { id: 3, title: 'search result 3', status: 'open' },
      { id: 4, title: 'search result 4', status: 'open' },
      { id: 5, title: 'search result 5', status: 'open' },
    ]
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Searching for: <span className={styles.query}>{this.state.query}</span></h1>
        <div className={styles.resultsList} >
          <table>
            <tbody>
              {this.state.results.map((r) =>
                <tr key={r.id} className={styles.searchRow}>
                  <td className={styles.rowTitle}>{r.title}</td>
                  <td className={styles.rowStatus}>{r.status}</td>
                  <td className={styles.rowInfo}>more info</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Search;
