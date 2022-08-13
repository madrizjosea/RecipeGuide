import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../redux/actions';
import Card from '../card/Card.jsx';
import s from './Recipes.module.css';
import Search from '../search/Search.jsx';

function Recipes() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(() => {
    if (!recipes.length) dispatch(getRecipes());
  }, [dispatch, recipes.length]);

  return (
    <div className={s.container}>
      <div className={s.menus}>
        <Search />
      </div>
      <div className={s.recipes}>
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
    </div>
  );
}

export default Recipes;
