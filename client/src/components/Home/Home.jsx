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
import Loader from '../Loader/Loader.jsx';

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

  const handleFilters = () => {
    dispatch(getRecipes());
  };
  console.log(state.loading)
  return (
    <div className={s.container}>
      {state.loading && state.loading === true ? (
        <Loader />
      ) : (
        <div>
          <div className={s.menus}>
            <Search />
            <Filter
              filterName="Sort Recipes"
              options={[
                { name: 'Alphabetically', values: ['A-Z', 'Z-A'] },
                { name: 'Health Score', values: ['0-100', '100-0'] },
              ]}
              dispatchHandler={sortBy}
              values={[]}
            />
            <Filter
              options={[]}
              filterName="Filter by Diet"
              values={state.diets && state.diets}
              // dispatchHandler={filterRecipes}
            />
            <button onClick={handleFilters}>Reset Filters</button>
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
      )}
    </div>
  );
}

export default Home;
