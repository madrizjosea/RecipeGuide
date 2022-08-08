import axios from '../../axios';

// Get all recipes
export function getAllRecipes() {
  return async function (dispatch) {
    let recipes = await axios.get('/recipes');
    return dispatch({
      type: 'GET_ALL_RECIPES',
      payload: recipes.data,
    })
  };
}
