import axios from '../../axios';

export const GET_REQUEST_FAILURE = 'GET_REQUEST_FAILURE',
  GET_RECIPES = 'GET_RECIPES',
  GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS',
  GET_DETAILS = 'GET_DETAILS',
  GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS',
  GET_BY_TITLE = 'GET_BY_TITLE',
  GET_BY_TITLE_SUCCESS = 'GET_BY_TITLE_SUCCESS',
  GET_DIETS = 'GET_DIETS',
  GET_DIETS_SUCCESS = 'GET_DIETS_SUCCESS',
  CLEAR_DETAILS = 'CLEAR_DETAILS',
  RESET_FILTERS = 'RESET_FILTERS',
  SORT = 'SORT',
  FILTER_BY_DIET = 'FILTER_BY_DIET',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';

// If requests fail
export const getRequestFailure = errorMsg => {
  return {
    type: GET_REQUEST_FAILURE,
    payload: errorMsg,
  };
};

// Get all recipes
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

export const getRecipes = () => {
  return dispatch => {
    dispatch(getRecipesRequest());
    axios
      .get('/recipes')
      .then(response => {
        const { data } = response;
        dispatch(getRecipesSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getRequestFailure(message));
      });
  };
};

// Get recipe details
export const getDetailsRequest = () => {
  return {
    type: GET_DETAILS,
  };
};

export const getDetailsSuccess = recipes => {
  return {
    type: GET_DETAILS_SUCCESS,
    payload: recipes,
  };
};

export const getDetails = id => {
  return dispatch => {
    dispatch(getDetailsRequest());
    axios
      .get(`/recipes/${id}`)
      .then(response => {
        const { data } = response;
        dispatch(getDetailsSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getRequestFailure(message));
      });
  };
};

// Get recipe by title
export const getByTitleRequest = () => {
  return {
    type: GET_BY_TITLE,
  };
};

export const getByTitleSuccess = recipe => {
  return {
    type: GET_BY_TITLE_SUCCESS,
    payload: recipe,
  };
};

export const getByTitle = title => {
  return dispatch => {
    dispatch(getByTitleRequest());
    axios
      .get(`/recipes?title=${title}`)
      .then(response => {
        const { data } = response;
        dispatch(getByTitleSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getRequestFailure(message));
      });
  };
};

// Get diets
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

export const getDiets = () => {
  return dispatch => {
    dispatch(getDietsRequest());
    axios
      .get('/diets')
      .then(response => {
        const { data } = response;
        dispatch(getDietsSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getRequestFailure(message));
      });
  };
};

// Clearing, reseting, sorting, filtering and pagination
export const resetDietFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const sortBy = value => {
  return {
    type: SORT,
    payload: value,
  };
};

export const filterByDiet = value => {
  return {
    type: FILTER_BY_DIET,
    payload: value,
  };
};

export const setPageNumber = number => {
  return {
    type: SET_PAGE_NUMBER,
    payload: number,
  };
};
