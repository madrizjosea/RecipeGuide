export const recipeDietFilter = (recipes, dietType) => {
  let filteredRecipes = [];
  recipes.forEach(recipe => {
    if (
      recipe.hasOwnProperty('diets') &&
      recipe.diets.find(diet => diet === dietType)
    ) {
      filteredRecipes.push(recipe);
    }
  });
  return filteredRecipes;
};
