import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipes } from '../../redux/actions/index.js';
// import { Link } from 'react-router-dom';
import Card from '../card/Card.jsx';
import s from './Recipes.module.css';
import Search from '../search/Search.jsx';

function Recipes() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    if (!state.recipes.length) dispatch(getAllRecipes());
  }, [dispatch, state.recipes.length]);

  return (
    <div className={s.container}>
      <div className={s.menus}>
        <Search />
      </div>
      <div className={s.recipes}>
        {state.recipes &&
          state.recipes.map(recipe => {
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
    </div>
  );
}

export default Recipes;
