import React, { Component } from "react";

class Search extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    this.setState({query})
  }

  render() {
    return (
        <div>Ola bom dia: {this.state.query}</div>
    )
  }
}

export default Search;
