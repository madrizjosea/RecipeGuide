import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipes,
  getDiets,
  sortBy,
  sortAlphaAsc,
  sortAlphaDesc,
} from '../../redux/actions';
import Card from '../Card/Card.jsx';
import s from './Home.module.css';
import Search from '../Search/Search.jsx';
import Filter from '../Filter/Filter';

function Home() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect(() => {
    if (!state.recipes.length) {
      dispatch(getDiets());
      dispatch(getRecipes());
    }
  }, [dispatch, state.recipes.length]);

  useEffect(() => {
    switch (state.sortBy) {
      case 'A-Z':
        return dispatch(sortAlphaAsc());
      case 'Z-A':
        return dispatch(sortAlphaDesc());
      default:
        break;
    }
  }, [dispatch, state.sortBy]);

  return (
    <div className={s.container}>
      <div className={s.menus}>
        <Search />
        <Filter
          option="Sort"
          values={['A-Z', 'Z-A', '0-100', '100-0']}
          dispatchHandler={sortBy}
        />
        <Filter
          option="Filter"
          values={state.diets && state.diets}
          // dispatchHandler={filterRecipes}
        />
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

export default Home;
