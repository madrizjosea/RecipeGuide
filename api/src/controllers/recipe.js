require('dotenv').config();
const axios = require('axios');
const { Recipe } = require('../db.js');
const { API_KEY } = process.env;

// This formats data for the Redux store
const recipeFormater = recipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    diets: recipe.diets,
    image: recipe.image,
  };
};

// CONTROLLERS

// GET request to fetch all recipes
const getRecipes = async (req, res, next) => {
  const { name } = req.query;
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );

    // Route query handler
    let recipes = [];
    if (name) {
      let recipesByName = await apiRecipes.data.results.filter(recipe =>
        recipe.title.toLowerCase().includes(name.toLowerCase())
      );
      recipesByName.length
        ? recipes.push(
            recipesByName.map(recipeFormater)
          )
        : res.status(404).send('This recipe does not exist');
    } else {
      recipes.push(
        apiRecipes.data.results.map(recipeFormater)
      );
    }
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

// GET request when the id is passed through parameters
const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const apiRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    const data = apiRecipe.data;

    const recipe = {
      id: data.id,
      title: data.title,
      image: data.image,
      dishTypes: data.dishTypes,
      diets: data.diets,
      healthScore: data.healthScore,
      summary: data.summary,
      steps: data.instructions,
    };

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
};
