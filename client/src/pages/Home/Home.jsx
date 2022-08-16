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
    if (!state.filtered.length) {
      dispatch(getDiets());
      dispatch(getRecipes());
    }
  }, [dispatch, state.filtered.length, state.recipes.length]);

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
      ) : state.requestErrorMsg ? (
        <Error
          customMsg={`Double check the name you entered. Click the button bellow and try searching for a different recipe or browse our catalog`}
        />
      ) : state.filterErrorMsg ? (
        <Error customMsg={state.filterErrorMsg} />
      ) : (
        state.filtered.length > 0 && (
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
                <button onClick={handleRecipesReset}>Reset Catalog</button>
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
        )
      )}
    </div>
  );
}

export default Home;
