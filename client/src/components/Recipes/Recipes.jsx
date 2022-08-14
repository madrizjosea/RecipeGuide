import React from 'react';
import Card from '../Card/Card.jsx';

const Recipes = ({ recipes }) => {
  return (
    <div>
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
