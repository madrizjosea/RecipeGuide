import React, { Component } from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipeDetails } from '../../redux/actions';

class Card extends Component {
  handleClick = id => {
    this.props.getRecipeDetails(id);
  };

  render() {
    return (
      <div className={s.container}>
        <h3>{this.props.title}</h3>
        <Link to={`/details/${this.props.id}`}>
          <img
            onClick={() => this.handleClick(this.props.id)}
            src={this.props.image}
            alt="recipe"
            width="195"
            height="220"
          />
        </Link>
        <p>Health Score: {this.props.score}</p>
      </div>
    );
  }
}

export const mapDispatchToProps = {
  getRecipeDetails,
};

export default connect(null, mapDispatchToProps)(Card);
