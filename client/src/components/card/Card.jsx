import React, { Component } from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    return (
      <div className={s.card}>
        <Link to={`/home/recipe/${this.props.id}`}>
          <img src={this.props.image} alt="recipe" />
        </Link>
        <div className={s.content}>
          <h3 className={s.title}>{this.props.title}</h3>
          <p>Health Score: {this.props.score}</p>
          <ul>
            {this.props.diets.map(diet => (
              <li key={diet}>{diet}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Card;
