require('dotenv').config();
const axios = require('../axios');
const { Recipe, Diet } = require('../db.js');
const { API_KEY } = process.env;

// This formats data for the Redux store
const formater = recipe => {
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
  try {
    const apiRecipes = await axios.get(
      `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`
    );
    const apiFormated = apiRecipes.data.results.map(formater);

    const dbRecipes = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
    const allRecipes = [...dbRecipes, ...apiFormated];

    res.status(200).json(allRecipes);
  } catch (error) {
    next(error);
  }
};

// Get request by Title
const getRecipeByTitle = async (req, res, next) => {
  const { title } = req.query;
  try {
    const apiRecipes = await axios.get(
      `complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&titleMatch=${title}`
    );
    const apiFormated = apiRecipes.data.results.map(formater);

    const dbRecipes = await Recipe.findAll({
      where: {
        title: title,
      },
      include: [
        {
          model: Diet,
          attributes: ['name'],
          through: { attributes: [] },
        },
      ],
    });
    const allRecipes = [...apiFormated, ...dbRecipes];

    res.send(200).json(allRecipes);
  } catch (error) {
    next(error);
  }
};

// GET request by id
const getRecipeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id.toString().split('-').length > 1) {
      const dbRecipe = await Recipe.findByPk(id, {
        where: { id: id },
        include: [
          {
            model: Diet,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      })
      res.status(200).json(dbRecipe);
    } else {
      const apiRecipe = await axios.get(
        `${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
      );
      const { data } = apiRecipe;
      // Steps formating
      const steps = await data.analyzedInstructions[0]?.steps.map(
        s => `${s.number}. ${s.step}`
      );

      const recipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        dishTypes: data.dishTypes,
        diets: data.diets,
        healthScore: data.healthScore,
        summary: data.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ''),
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
  const { title, summary, healthScore, diets, steps, image } = req.body;

  try {
    const newRecipe = await Recipe.create({
      title,
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
  getRecipeByTitle
};
