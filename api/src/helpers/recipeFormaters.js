const apiRecipeFormater = recipe => {
  return {
    id: recipe.id,
    name: recipe.title,
    diets: recipe.diets,
    image: recipe.image,
    healthScore: recipe.healthScore,
  };
};

const dbRecipeFormater = recipe => {
  let parsedDiets = [];
  recipe.diets.forEach(diet => parsedDiets.push(diet.name));
  return {
    id: recipe.id,
    name: recipe.name,
    summary: recipe.sumamry && recipe.sumamry,
    dishTypes: recipe.dishTypes && recipe.dishTypes,
    diets: parsedDiets,
    image: recipe.image,
    steps: recipe.steps,
    healthScore: recipe.healthScore,
  };
};

module.exports = {
  apiRecipeFormater,
  dbRecipeFormater,
};