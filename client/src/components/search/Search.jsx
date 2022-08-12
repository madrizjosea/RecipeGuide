import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSearch() {
    // Submit functionality
  }

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type="text"
          placeholder="Search by name..."
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
