import {
  GET_RECIPES,
  GET_RECIPES_SUCCESS,
  GET_RECIPES_FAIL,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_DETAILS_FAIL,
  GET_BY_TITLE,
  GET_BY_TITLE_SUCCESS,
  GET_BY_TITLE_FAIL,
  GET_DIETS,
  GET_DIETS_SUCCESS,
  GET_DIETS_FAIL,
  CLEAR_DETAILS,
} from '../actions';

const initialState = {
  recipes: [],
  details: {},
  diets: [],
  loading: false,
  errorMsg: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        loading: true,
      };
    case GET_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case GET_RECIPES_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
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
        details: action.payload,
      };
    case GET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    case GET_BY_TITLE:
      return {
        ...state,
        loading: true,
      };
    case GET_BY_TITLE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case GET_BY_TITLE_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
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
        diets: action.payload,
      };
    case GET_DIETS_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
