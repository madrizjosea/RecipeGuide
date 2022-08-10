import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes, clearDetails } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import Card from '../card/Card.jsx';
import s from './Recipes.module.css';

function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(clearDetails());
    if (!recipes.length) dispatch(getAllRecipes());
  }, [dispatch, recipes]);

  return (
    <div className={s.container}>
      <Link to={'/create'}>
        <button>Create a recipe</button>
      </Link>
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
