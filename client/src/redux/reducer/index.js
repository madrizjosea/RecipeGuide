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

const initialState = {
  loading: false,
  recipes: [],
  recipesByName: [],
  details: {},
  diets: [],
  successMsg: '',
  requestError: {},
  filterErrorMsg: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        requestError: action.payload,
      };
    case GET_RECIPES:
      return {
        ...state,
        loading: true,
      };
    case GET_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        requestError: {},
        recipes: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        requestError: {},
        details: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        loading: true,
      };
    case GET_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        requestError: {},
        recipesByName: action.payload,
      };
    case CLEAR_RECIPES_BY_NAME:
      return {
        ...state,
        recipesByName: [],
      };
    case POST_RECIPE:
      return {
        ...state,
        loading: true,
      };
    case POST_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMsg: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        loading: true,
      };
    case GET_DIETS_SUCCESS:
      return {
        ...state,
        loading: false,
        requestError: {},
        diets: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };
    case CLEAR_ERROR_MSG:
      return {
        ...state,
        requestError: {},
        filterErrorMsg: '',
      };
    case CLEAR_SUCCESS_MSG:
      return {
        ...state,
        successMsg: '',
      };
    case SET_FILTER_ERROR_MSG:
      return {
        ...state,
        filterErrorMsg: action.payload,
      };
    case CLEAR_FILTER_ERROR_MSG:
      return {
        ...state,
        filterErrorMsg: '',
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
