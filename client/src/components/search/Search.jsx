import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getByName } from '../../redux/actions';
import s from './Search.module.css';

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
    const name = this.state.value.toLowerCase();
    this.props.getByName(name);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <form className={s.container} onSubmit={e => this.handleSearch(e)}>
        <input
          type="text"
          placeholder="Recipe name..."
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        <button>Search</button>
      </form>
    );
  }
}

export const mapDispatchToProps = {
  getByName,
};

export default connect(null, mapDispatchToProps)(Search);
