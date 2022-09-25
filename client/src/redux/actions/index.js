import axios from '../../axios';
import {
  REQUEST_FAILURE,
  GET_RECIPES,
  GET_RECIPES_SUCCESS,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_BY_NAME,
  GET_BY_NAME_SUCCESS,
  CLEAR_RECIPES_BY_NAME,
  POST_RECIPE,
  POST_RECIPE_SUCCESS,
  GET_DIETS,
  GET_DIETS_SUCCESS,
  CLEAR_DETAILS,
  CLEAR_SUCCESS_MSG,
  CLEAR_ERROR_MSG,
  SET_FILTER_ERROR_MSG,
  CLEAR_FILTER_ERROR_MSG,
} from '../actions/types.js';

// Get all recipes
export const getRecipes = () => {
  return async dispatch => {
    try {
      dispatch(getRecipesRequest());
      const response = await axios.get('/recipes');
      dispatch(getRecipesSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error.response.data));
    }
  };
};

export const getRecipesRequest = () => {
  return {
    type: GET_RECIPES,
  };
};

export const getRecipesSuccess = recipes => {
  return {
    type: GET_RECIPES_SUCCESS,
    payload: recipes,
  };
};

export const requestFailure = errorMsg => {
  return {
    type: REQUEST_FAILURE,
    payload: errorMsg,
  };
};

// Get recipe details
export const getDetails = id => {
  return async dispatch => {
    try {
      dispatch(getDetailsRequest());
      const response = await axios.get(`/recipes/${id}`);
      dispatch(getDetailsSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error.response.data));
    }
  };
};

export const getDetailsRequest = () => {
  return {
    type: GET_DETAILS,
  };
};

export const getDetailsSuccess = recipe => {
  return {
    type: GET_DETAILS_SUCCESS,
    payload: recipe,
  };
};

// Get recipe by name
export const getByName = name => {
  return async dispatch => {
    try {
      dispatch(getByNameRequest());
      const response = await axios.get(`/recipes?name=${name}`);
      dispatch(getByNameSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error.response.data));
    }
  };
};

export const getByNameRequest = () => {
  return {
    type: GET_BY_NAME,
  };
};

export const getByNameSuccess = recipes => {
  return {
    type: GET_BY_NAME_SUCCESS,
    payload: recipes,
  };
};

export const clearRecipesByName = () => {
  return {
    type: CLEAR_RECIPES_BY_NAME,
  };
};

// Submit a recipe
export const postRecipe = recipe => {
  return async dispatch => {
    try {
      dispatch(postRecipeRequest());
      const response = await axios.post('/recipes', recipe);
      dispatch(postRecipeSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error.response.data));
    }
  };
};

export const postRecipeRequest = () => {
  return {
    type: POST_RECIPE,
  };
};

export const postRecipeSuccess = message => {
  return {
    type: POST_RECIPE_SUCCESS,
    payload: message,
  };
};

// Get diets
export const getDiets = () => {
  return async dispatch => {
    try {
      dispatch(getDietsRequest());
      const response = await axios.get('/diets');
      dispatch(getDietsSuccess(response.data));
    } catch (error) {
      dispatch(requestFailure(error.response.data));
    }
  };
};

export const getDietsRequest = () => {
  return {
    type: GET_DIETS,
  };
};

export const getDietsSuccess = diets => {
  return {
    type: GET_DIETS_SUCCESS,
    payload: diets,
  };
};

// Clearing, reseting, sorting, filtering and pagination
export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const clearSuccessMsg = () => {
  return {
    type: CLEAR_SUCCESS_MSG,
  };
};

export const clearErrorMsg = () => {
  return {
    type: CLEAR_ERROR_MSG,
  };
};

export const setFilterErrorMsg = errorMsg => {
  return {
    type: SET_FILTER_ERROR_MSG,
    payload: errorMsg,
  };
};

export const clearFilterErrorMsg = () => {
  return {
    type: CLEAR_FILTER_ERROR_MSG,
  };
};
