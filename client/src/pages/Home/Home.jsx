import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, clearRecipesByName } from '../../redux/actions';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter';
import Sorter from '../../components/Sorter/Sorter.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Recipes from '../../components/Recipes/Recipes.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
// import Error from '../../components/Error/Error.jsx';
import s from './Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination variables
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  useEffect(() => {
    if (!state.recipesByName.length) setFilteredRecipes(state.recipes);
    else setFilteredRecipes(state.recipesByName);
  }, [state.recipes, state.recipesByName]);

  useEffect(() => {
    if (!state.recipes.length) {
      dispatch(getDiets());
      dispatch(getRecipes());
    }
  }, [dispatch, state.recipes]);

  const handleRecipesReset = () => {
    setFilteredRecipes(state.recipes);
    dispatch(clearRecipesByName());
  };

  const handleFiltersReset = () => {
    if (!state.recipesByName.length) setFilteredRecipes(state.recipes);
    else setFilteredRecipes(state.recipesByName);
  };

  return (
    <div className={s.container}>
      {state.loading ? (
        <Loader />
      ) : state.recipes.length && state.diets ? (
        <section>
          <div className={s.menus}>
            <Search />
            <Sorter
              recipes={[...filteredRecipes]}
              recipeSetter={setFilteredRecipes}
              recipesReset={handleFiltersReset}
            />
            <Filter
              options={state.diets}
              recipes={state.recipes}
              recipeSetter={setFilteredRecipes}
              recipesReset={handleFiltersReset}
            />
            <div>
              <button onClick={handleRecipesReset}>Restore Catalog</button>
            </div>
          </div>
          <Recipes recipes={currentRecipes} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={recipesPerPage}
            totalItems={filteredRecipes.length}
            pageSetter={setCurrentPage}
          />
        </section>
      ) : null}
    </div>
  );
};

export default Home;
