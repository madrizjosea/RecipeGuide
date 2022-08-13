import {
  GET_RECIPES,
  GET_RECIPES_SUCCESS,
  GET_DETAILS,
  GET_DETAILS_SUCCESS,
  GET_BY_TITLE,
  GET_BY_TITLE_SUCCESS,
  GET_DIETS,
  GET_DIETS_SUCCESS,
  CLEAR_DETAILS,
  SORT,
  FILTER_BY_DIET,
} from '../actions';

const initialState = {
  recipes: [],
  filtered: [],
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
        details: action.payload,
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
    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };
    case SORT:
      switch (action.payload) {
        case 'default':
          return {
            ...state,
            filtered: state.recipes,
          }
        case 'A-Z':
          let recipesToSortAsc = [...state.recipes];
          let sortedAlphaAsc = recipesToSortAsc.sort((a, b) => {
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
            filtered: sortedAlphaAsc,
          };
        case 'Z-A':
          let recipesToSortDesc = [...state.recipes];
          let sortedAlphaDesc = recipesToSortDesc.sort((a, b) => {
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
            filtered: sortedAlphaDesc,
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
      return {
        ...state,
        filtered: filteredRecipes.length > 0 ? filteredRecipes : state.recipes,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
