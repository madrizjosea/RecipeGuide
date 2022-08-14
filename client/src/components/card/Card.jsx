import React, { Component } from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.devider}>
          <h3>{this.props.title}</h3>
          <Link to={`/home/recipe/${this.props.id}`}>
            <img src={this.props.image} alt="recipe" width="195" height="200" />
          </Link>
        </div>
        <div className={s.devider}>
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
