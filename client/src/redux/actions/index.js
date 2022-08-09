// Importing the axios instance
import axios from '../../axios';

// All action types
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES',
  GET_ALL_DIETS = 'GET_ALL_DIETS',
  GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';

// Get all recipes
export function getAllRecipes() {
  return async function (dispatch) {
    const recipes = await axios.get('/recipes');
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: recipes.data,
    });
  };
}

// Get all diets
export function getAllDiets() {
  return async function (dispatch) {
    const diets = await axios.get('/diets');
    return dispatch({
      type: GET_ALL_DIETS,
      payload: diets.data,
    });
  };
}

// Get recipe detail by id
export function getRecipeDetails(id) {
  return async function (dispatch) {
    const recipeDetails = await axios.get('/recipes/:' + id);
    return dispatch({
      type: GET_RECIPE_DETAILS,
      payload: recipeDetails.data,
    });
  };
}
