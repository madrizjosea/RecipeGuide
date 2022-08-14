import {
  GET_REQUEST_FAILURE,
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
  SET_PAGE_NUMBER,
} from '../actions';

const initialState = {
  recipes: [],
  filtered: [],
  details: {},
  diets: [],
  loading: false,
  errorMsg: '',
  filterErrorMsg: '',
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        currentPage: 1,
        errorMsg: action.payload,
      }
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
        errorMsg: '',
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
        errorMsg: '',
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
        errorMsg: '',
        recipes: action.payload,
        filtered: action.payload,
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
        errorMsg: '',
        diets: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        details: {},
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SORT:
      switch (action.payload) {
        case 'A-Z':
          let recipesToSortAsc = [...state.filtered];
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
          let recipesToSortDesc = [...state.filtered];
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
            filtered: state.recipes,
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
