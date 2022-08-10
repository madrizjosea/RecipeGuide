import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions/index.js';
import Card from '../card/Card.jsx';
import s from './Recipes.module.css';

function Recipes() {

  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(() => {
    if (!recipes.length) dispatch(getAllRecipes());
  }, [dispatch, recipes]);

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
            />
          );
        })}
    </div>
  );
}

export default Recipes;
