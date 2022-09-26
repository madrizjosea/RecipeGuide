import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets, clearRecipesByName } from '../../redux/actions';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter';
import Sorter from '../../components/Sorter/Sorter.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Recipes from '../../components/Recipes/Recipes.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Error from '../../components/Error/Error.jsx';
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
  }, [dispatch, state.recipes.length]);

  const handleRecipesReset = () => {
    setFilteredRecipes(state.recipes);
    dispatch(clearRecipesByName());
    setCurrentPage(1);
  };

  const handleFiltersReset = () => {
    if (!state.recipesByName.length) setFilteredRecipes(state.recipes);
    else setFilteredRecipes(state.recipesByName);
  };
  console.log('Rendering');
  return (
    <>
      {state.recipes && state.diets ? (
        <>
          {state.loading ? (
            <Loader />
          ) : state.requestError.message || state.filterError ? (
            <div className={s.errorBackground}>
              <Error />
            </div>
          ) : null}
          <header>
            <div className={s.navContainer}>
              <Link className={s.links} to="/home">
                Home
              </Link>
              <div className={s.menus}>
                <Search />
                <Sorter
                  recipes={[...filteredRecipes]}
                  recipeSetter={setFilteredRecipes}
                  recipesReset={handleFiltersReset}
                  pageSetter={setCurrentPage}
                />
                <Filter
                  options={state.diets}
                  recipes={state.recipes}
                  recipeSetter={setFilteredRecipes}
                  recipesReset={handleFiltersReset}
                  pageSetter={setCurrentPage}
                />
                <div>
                  <button onClick={handleRecipesReset}>Restore Catalog</button>
                </div>
              </div>
              <Link className={s.links} to="/home/create">
                Create a Recipe
              </Link>
            </div>
          </header>
          <section className={s.container}>
            <Recipes recipes={currentRecipes} />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={recipesPerPage}
              totalItems={filteredRecipes.length}
              pageSetter={setCurrentPage}
            />
          </section>
        </>
      ) : null}
    </>
  );
};

export default Home;
