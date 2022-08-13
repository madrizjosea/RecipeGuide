import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getByTitle } from '../../redux/actions';
class Search extends Component {
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

  handleSearch(e) {
    e.preventDefault();
    let title = this.state.value.toLowerCase();
    this.props.getByTitle(title);
  }

  render() {
    return (
      <form onSubmit={e => this.handleSearch(e)}>
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

export const mapDispatchToProps = {
  getByTitle,
};

export default connect(null, mapDispatchToProps)(Search);
