import axios from '../../axios';

export const GET_RECIPES = 'GET_RECIPES',
  GET_RECIPES_SUCCESS = 'GET_RECIPES_SUCCESS',
  GET_RECIPES_FAIL = 'GET_RECIPES_FAIL',
  GET_DETAILS = 'GET_DETAILS',
  GET_DETAILS_SUCCESS = 'GET_DETAILS_SUCCESS',
  GET_DETAILS_FAIL = 'GET_DETAILS_FAIL',
  GET_BY_TITLE = 'GET_BY_TITLE',
  GET_BY_TITLE_SUCCESS = 'GET_BY_TITLE_SUCCESS',
  GET_BY_TITLE_FAIL = 'GET_BY_TITLE_FAIL',
  GET_DIETS = 'GET_DIETS_REQUEST',
  GET_DIETS_SUCCESS = 'GET_DIETS_SUCCESS',
  GET_DIETS_FAIL = 'GET_DIETS_FAIL',
  CLEAR_DETAILS = 'CLEAR_DETAILS',
  SORT = 'SORT',
  SORT_ALPHA_ASC = 'SORT_ALPHA_ASC',
  SORT_ALPHA_DESC = 'SORT_ALPHA_DESC';

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

export const getRecipesFailure = errorMsg => {
  return {
    type: GET_RECIPES_FAIL,
    payload: errorMsg,
  };
};

export const getRecipes = () => {
  return dispatch => {
    dispatch(getRecipesRequest);
    axios
      .get('/recipes')
      .then(response => {
        const { data } = response;
        dispatch(getRecipesSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getRecipesFailure(message));
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

export const getDetailsFailure = errorMsg => {
  return {
    type: GET_DETAILS_FAIL,
    payload: errorMsg,
  };
};

export const getDetails = id => {
  return dispatch => {
    dispatch(getDetailsRequest);
    axios
      .get(`/recipes/${id}`)
      .then(response => {
        const { data } = response;
        dispatch(getDetailsSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getDetailsFailure(message));
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

export const getByTitleFailure = errorMsg => {
  return {
    type: GET_BY_TITLE_FAIL,
    payload: errorMsg,
  };
};

export const getByTitle = title => {
  return dispatch => {
    dispatch(getByTitleRequest);
    axios
      .get(`/recipes?title=${title}`)
      .then(response => {
        const { data } = response;
        dispatch(getByTitleSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getByTitleFailure(message));
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

export const getDietsFailure = errorMsg => {
  return {
    type: GET_DIETS_FAIL,
    payload: errorMsg,
  };
};

export const getDiets = () => {
  return dispatch => {
    dispatch(getDietsRequest);
    axios
      .get('/diets')
      .then(response => {
        const { data } = response;
        dispatch(getDietsSuccess(data));
      })
      .catch(error => {
        const { message } = error;
        dispatch(getDietsFailure(message));
      });
  };
};

// Clear details
export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

// Sorting
export const sortBy = value => {
  return {
    type: SORT,
    payload: value,
  };
};

export const sortAlphaAsc = () => {
  return {
    type: SORT_ALPHA_ASC,
  };
};

export const sortAlphaDesc = () => {
  return {
    type: SORT_ALPHA_DESC,
  };
};
