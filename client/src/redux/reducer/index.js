import {
  REQUEST_FAILURE,
  GET_RECIPES,
  GET_RECIPES_SUCCESS,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_BY_NAME,
  GET_BY_NAME_SUCCESS,
  POST_RECIPE,
  POST_RECIPE_SUCCESS,
  GET_DIETS,
  GET_DIETS_SUCCESS,
  CLEAR_DETAILS,
  RESET_FILTERS,
  CLEAR_ERROR,
  SORT,
  FILTER_BY_DIET,
  SET_PAGE_NUMBER,
} from '../actions/types.js';

const initialState = {
  recipes: [],
  filtered: [],
  details: {},
  diets: [],
  loading: false,
  requestError: '',
  filterErrorMsg: '',
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        currentPage: 1,
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
        currentPage: 1,
        requestError: '',
        recipes: action.payload,
        filtered: action.payload,
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
        requestError: '',
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
        requestError: '',
        filtered: action.payload,
        currentPage: 1,
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
        requestError: '',
        diets: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };
    case CLEAR_ERROR:
      return {
        ...state,
        requestError: '',
      };
    case RESET_FILTERS:
      return {
        ...state,
        filtered: [...state.recipes],
        currentPage: 1,
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SORT:
      switch (action.payload) {
        case 'A-Z':
          let recipesToSortAlphaAsc = [...state.filtered];
          let sortedAlphaAsc = recipesToSortAlphaAsc.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          return {
            ...state,
            filtered: sortedAlphaAsc,
          };
        case 'Z-A':
          let recipesToSortAlphaDesc = [...state.filtered];
          let sortedAlphaDesc = recipesToSortAlphaDesc.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return 1;
            }
            if (b.name.toLowerCase() < a.name.toLowerCase()) {
              return -1;
            }
            return 0;
          });
          return {
            ...state,
            filtered: sortedAlphaDesc,
          };
        case '0-100':
          let recipesToSortScoreAsc = [...state.filtered];
          let sortedScoreAsc = recipesToSortScoreAsc.sort((a, b) => {
            return a.healthScore - b.healthScore;
          });
          return {
            ...state,
            filtered: sortedScoreAsc,
          };
        case '100-0':
          let recipesToSortScoreDesc = [...state.filtered];
          let sortedScoreDesc = recipesToSortScoreDesc.sort((a, b) => {
            return b.healthScore - a.healthScore;
          });
          return {
            ...state,
            filtered: sortedScoreDesc,
          };
        default:
          return {
            ...state,
          };
      }
    case FILTER_BY_DIET:
      let stateRecipes = [...state.recipes];
      let filteredRecipes = [];
      stateRecipes.forEach(recipe => {
        if (
          recipe.hasOwnProperty('diets') &&
          recipe.diets.find(diet => diet === action.payload)
        ) {
          filteredRecipes.push(recipe);
        }
      });
      if (filteredRecipes.length > 0) {
        return {
          ...state,
          currentPage: 1,
          filtered: filteredRecipes,
        };
      } else {
        return {
          ...state,
          currentPage: 1,
          filterErrorMsg: 'No recipes found for this diet',
        };
      }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
