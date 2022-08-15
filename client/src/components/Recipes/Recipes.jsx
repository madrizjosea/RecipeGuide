import React from 'react';
import Card from '../Card/Card.jsx';
import s from './Recipes.module.css';

const Recipes = ({ recipes }) => {
  return (
    <div className={s.container}>
      {recipes &&
        recipes.map(recipe => {
          return (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              score={recipe.healthScore}
              diets={recipe.diets}
            />
          );
        })}
    </div>
  );
};

export default Recipes;
