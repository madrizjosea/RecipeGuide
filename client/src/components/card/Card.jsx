import React, { Component } from 'react';
import s from './Card.module.css';
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    return (
      <Link className={s.container} to={`/home/recipe/${this.props.id}`}>
        <div className={s.card}>
          <img src={this.props.image} alt="recipe" />
          <div className={s.content}>
            <h3 className={s.name}>{this.props.name}</h3>
            <p>Health Score: {this.props.score}</p>
            <div className={s.diets}>
              {this.props.diets.map(diet => (
                <div className={s.diet} key={diet}>
                  {diet}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Card;
