import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRecipes,
  getDiets,
  sortBy,
  resetDietFilters,
  filterByDiet,
  setPageNumber,
} from '../../redux/actions';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter';
import Sort from '../../components/Sort/Sort.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Recipes from '../../components/Recipes/Recipes.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Error from '../../components/Error/Error.jsx';
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
    if (state.filtered.length < 1) dispatch(getRecipes());
    if (state.diets.length < 1) dispatch(getDiets());
  }, [dispatch, state.filtered.length, state.diets.length]);

  // Filters handling
  const handleDietsReset = () => {
    dispatch(resetDietFilters());
  };

  const handleRecipesReset = () => {
    dispatch(getRecipes());
  };

  return (
    <div className={s.container}>
      {state.loading && state.loading === true ? (
        <Loader />
      ) : state.requestError ? (
        <Error
          customMsg={`Click the button bellow and try searching for a different recipe or browse our catalog`}
        />
      ) : (
        <div>
          <Pagination
            currentPage={state.currentPage}
            itemsPerPage={recipesPerPage}
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
            <div>
              <button onClick={handleDietsReset}>Reset Filters</button>
              <button onClick={handleRecipesReset}>Reset Recipes</button>
            </div>
          </div>
          <Recipes recipes={currentRecipes} />
          <Pagination
            currentPage={state.currentPage}
            itemsPerPage={recipesPerPage}
            totalItems={state.filtered.length}
            dispatchHandler={setPageNumber}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
