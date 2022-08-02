require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const { API_KEY } = process.env;

// Initial request for the home page
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
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipes,
};
