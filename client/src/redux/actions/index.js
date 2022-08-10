// Importing the axios instance
import axios from '../../axios/index.js';

// All action types
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ALL_DIETS = 'GET_ALL_DIETS';
export const GET_DETAILS = 'GET_DETAILS';

// Get all recipes
export function getAllRecipes() {
  return async function (dispatch) {
    const { data } = await axios.get('/recipes');
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: data,
    });
  };
}

// Get all diets
export function getAllDiets() {
  return async function (dispatch) {
    const { data } = await axios.get('/diets');
    return dispatch({
      type: GET_ALL_DIETS,
      payload: data,
    });
  };
}

// Get recipe detail by id
export function getRecipeDetails(id) {
  return async function (dispatch) {
    const { data } = await axios.get(`/recipes/${id}`);
    return dispatch({
      type: GET_DETAILS,
      payload: data,
    });
  };
}
