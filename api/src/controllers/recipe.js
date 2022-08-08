require('dotenv').config();
const axios = require('axios');
const { Recipe, Diet } = require('../db.js');
const { API_KEY } = process.env;

// This formats data for the Redux store
const recipeFormater = recipe => {
  return {
    id: recipe.id,
    title: recipe.title,
    diets: recipe.diets,
    image: recipe.image,
    healthScore: recipe.healthScore,
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
        ? (recipes = recipesByName.map(recipeFormater))
        : res.status(404).send('This recipe does not exist');
    } else {
      recipes = apiRecipes.data.results.map(recipeFormater);
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
    if (id.toString().split('-').length > 1) {
      await Recipe.findByPk(id, {
        where: { id: id },
        include: [
          {
            model: Diet,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      }).then(recipe => res.status(200).json(recipe));
    } else {
      const apiRecipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
      );
      const { data } = apiRecipe;
      // Steps formating
      const steps = await data.analyzedInstructions[0].steps.map(
        s => `${s.number}. ${s.step}`
      );

      const recipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        dishTypes: data.dishTypes,
        diets: data.diets,
        healthScore: data.healthScore,
        summary: data.summary,
        steps: steps,
      };

      res.status(200).json(recipe);
    }
  } catch (error) {
    next(error);
  }
};

// POST request to create a new Recipe
const createRecipe = async (req, res, next) => {
  const { name, summary, healthScore, diets, steps, image } = req.body;

  try {
    const newRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      diets,
      steps,
      image,
    });

    // Diet parsing and assosiation
    diets.map(async diet => {
      const filteredDiets = await Diet.findAll({ where: { name: diet } });
      newRecipe.addDiet(filteredDiets[0]);
    });

    res.status(201).send('Your recipe was created successfuly');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
};
