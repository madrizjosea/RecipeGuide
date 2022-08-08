const initialState = {
  recipes: [],
  recipeDetail: {},
  // any other necesary global states
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // all needed actions
    case 'GET_ALL_RECIPES':
      return { ...state, recipes: action.payload };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
