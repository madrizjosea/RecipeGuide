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
  let parsedSteps = [];
  recipe.steps.forEach((step, idx) => parsedSteps.push(`${idx + 1}. ${step}`));

  return {
    id: recipe.id,
    name: recipe.name,
    summary: recipe.sumamry && recipe.sumamry,
    dishTypes: recipe.dishTypes && recipe.dishTypes,
    diets: parsedDiets,
    image: recipe.image,
    steps: parsedSteps,
    healthScore: recipe.healthScore,
  };
};

module.exports = {
  apiRecipeFormater,
  dbRecipeFormater,
};
