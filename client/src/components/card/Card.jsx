import React, { Component } from 'react';
import s from './Card.module.css';

export default class Card extends Component {
  render() {
    return (
      <div className={s.container}>
        <h3>{this.props.title}</h3>
        <img src={this.props.image} alt="recipe" width="195" height="220" />
        <p>Health Score: {this.props.score}</p>
      </div>
    );
  }
}
