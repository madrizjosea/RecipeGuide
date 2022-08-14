import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipes,
  getDiets,
  sortBy,
  filterByDiet,
  setPageNumber,
} from '../../redux/actions';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter';
import Sort from '../../components/Sort/Sort.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Recipes from '../../components/Recipes/Recipes.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import s from './Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  // Pagination variables
  const recipesPerPage = 9,
    indexOfLastRecipe = state.currentPage * recipesPerPage,
    indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage,
    currentRecipes = state.filtered.slice(
      indexOfFirstRecipe,
      indexOfLastRecipe
    );

  useEffect(() => {
    if (!state.recipes.length) {
      dispatch(getDiets());
      dispatch(getRecipes());
    }
  }, [dispatch, state.recipes.length, state.filtered]);

  // Filters handling
  const handleFiltersReset = () => {
    dispatch(getRecipes());
  };

  return (
    <div className={s.container}>
      {state.loading && state.loading === true ? (
        <Loader />
      ) : state.errorMsg ? (
        <div>{state.errorMsg}</div>
      ) : (
        <div>
          <Pagination
            itemsPerPage={recipesPerPage && recipesPerPage}
            totalItems={state.filtered.length}
            dispatchHandler={setPageNumber}
          />
          <div className={s.menus}>
            <Search />
            <Sort
              label="Sort options"
              options={[
                { name: 'Alphabetically', values: ['A-Z', 'Z-A'] },
                { name: 'Health Score', values: ['0-100', '100-0'] },
              ]}
              dispatchHandler={sortBy}
            />
            <Filter
              label="Filter by diet"
              options={state.diets && state.diets}
              dispatchHandler={filterByDiet}
            />
            <button onClick={handleFiltersReset}>Reset Filters</button>
          </div>
          <Recipes recipes={currentRecipes} />
          <Pagination
            itemsPerPage={recipesPerPage && recipesPerPage}
            totalItems={state.filtered.length}
            dispatchHandler={setPageNumber}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
