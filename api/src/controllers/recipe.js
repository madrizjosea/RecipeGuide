require('dotenv').config();
const axios = require('axios');
const { Recipe } = require('../db.js');
const { API_KEY } = process.env;

// Initial request to fetch all recipes
const getAllRecipes = async (req, res, next) => {
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );
    const recipes = apiRecipes.data.results.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        diets: recipe.diets,
        image: recipe.image,
      };
    });
    console.log(recipes);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

// Request when the id is passed through parameters
const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const apiRecipe = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );
    const data = apiRecipe.data;
    console.log(data);
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
  getAllRecipes,
  getRecipeById,
};
