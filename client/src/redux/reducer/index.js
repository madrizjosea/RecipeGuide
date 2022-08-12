import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_DETAILS,
  CLEAR_DETAILS,
  GET_RECIPE_BY_NAME,
} from '../actions';

const initialState = {
  recipes: [],
  diets: [],
  recipeDetails: {},
  // any other necesary global states
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // all needed actions
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPE_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        recipeDetails: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        recipeDetails: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
