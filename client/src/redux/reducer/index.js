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
  SORT,
  SORT_ALPHA_ASC,
  SORT_ALPHA_DESC,
} from '../actions';

const initialState = {
  recipes: [],
  details: {},
  diets: [],
  loading: false,
  errorMsg: '',
  sortBy: 'unsorted',
  filterBy: 'unfiltered',
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
    case SORT:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SORT_ALPHA_ASC:
      let sortedAlphaAsc = state.recipes.sort(function (a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        recipes: sortedAlphaAsc,
      };
    case SORT_ALPHA_DESC:
      let sortedAlphaDesc = state.recipes.sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() < a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        recipes: sortedAlphaDesc,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
