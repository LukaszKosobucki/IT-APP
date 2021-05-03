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
    this.setState({ query })
    this.getResults()
  }

  // TODO: implement search logic
  getResults() {
    // mock data for testing purposes
    this.setState({
      results: [
        { id: 1, title: 'search result 1', status: 'open' },
        { id: 2, title: 'search result 2', status: 'closed' },
        { id: 3, title: 'search result 3', status: 'open' },
        { id: 4, title: 'search result 4', status: 'open' },
        { id: 5, title: 'search result 5', status: 'open' },
      ]
    })
  }

  render() {
    return (
      <div>
        <h1>Searching for: {this.state.query}</h1>
        <div className={styles.container} >
          <ul >
            {this.state.results.map((r) => <li className={styles.searchRow}><div>{r.title}</div> <div>{r.status}</div> <div>more info</div></li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Search;
