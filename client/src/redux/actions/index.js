import axios from '../../axios';

export const REQUEST_FAILURE = 'REQUEST_FAILURE',
  GET_RECIPES = 'GET_RECIPES',
  GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS',
  GET_DETAILS = 'GET_DETAILS',
  GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS',
  GET_BY_TITLE = 'GET_BY_TITLE',
  GET_BY_TITLE_SUCCESS = 'GET_BY_TITLE_SUCCESS',
  POST_RECIPE = 'POST_RECIPE',
  POST_RECIPE_SUCCESS = 'POST_RECIPE_SUCCESS',
  GET_DIETS = 'GET_DIETS',
  GET_DIETS_SUCCESS = 'GET_DIETS_SUCCESS',
  CLEAR_DETAILS = 'CLEAR_DETAILS',
  RESET_FILTERS = 'RESET_FILTERS',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SORT = 'SORT',
  FILTER_BY_DIET = 'FILTER_BY_DIET',
  SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';

// If requests fail
export const requestFailure = errorMsg => {
  return {
    type: REQUEST_FAILURE,
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
        dispatch(requestFailure(message));
      });
  };
};

// Get recipe details
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

export const getDetails = id => {
  return dispatch => {
    dispatch(getDetailsRequest());
    axios
      .get(`/recipes/${id}`)
      .then(response => {
        dispatch(getDetailsSuccess(response.data));
      })
      .catch(error => {
        dispatch(requestFailure(error.response.data || error.message));
      });
  };
};

// Get recipe by title
export const getByTitleRequest = () => {
  return {
    type: GET_BY_TITLE,
  };
};

export const getByTitleSuccess = recipes => {
  return {
    type: GET_BY_TITLE_SUCCESS,
    payload: recipes,
  };
};

export const getByTitle = title => {
  return dispatch => {
    dispatch(getByTitleRequest());
    axios
      .get(`/recipes?title=${title}`)
      .then(response => {
        dispatch(getByTitleSuccess(response.data));
      })
      .catch(error => {
        dispatch(requestFailure(error.response.data || error.message));
      });
  };
};

// Submit a recipe
export const postRecipeRequest = () => {
  return {
    type: POST_RECIPE,
  };
};

export const postRecipeSuccess = () => {
  return {
    type: POST_RECIPE_SUCCESS,
  };
};

export const postRecipe = recipe => {
  return dispatch => {
    dispatch(postRecipeRequest());
    axios
      .post('/recipes', recipe)
      .then(response => dispatch(postRecipeSuccess()))
      .catch(error => {
        dispatch(requestFailure(error.response.data || error.message));
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
        dispatch(getDietsSuccess(response.data));
      })
      .catch(error => {
        dispatch(requestFailure(error.response.data || error.message));
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

export const clearErrorMsg = () => {
  return {
    type: CLEAR_ERROR,
  }
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
