require('dotenv').config();
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const {
  apiRecipeFormater,
  dbRecipeFormater,
} = require('../helpers/recipeFormaters.js');
const { getAll, getByTitle, getById } = require('../helpers/requestHelpers.js');

// GET request to fetch all recipes
const getRecipes = async (req, res, next) => {
  const { title } = req.query;
  // Title query handler
  if (title) {
    try {
      const apiRecipes = await getByTitle(title);
      const apiFormated = apiRecipes.map(apiRecipeFormater);
      const dbRecipes = await Recipe.findAll({
        where: {
          title: {
            [Op.iLike]: '%' + title + '%',
          },
        },
        include: [
          {
            model: Diet,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      });
      const dbFormated = dbRecipes.map(dbRecipeFormater);
      const allRecipes = [...dbFormated, ...apiFormated];
      !allRecipes.length
        ? res.status(404).send('This recipe does not exist')
        : res.status(200).json(allRecipes);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const apiRecipes = await getAll();
      const apiFormated = apiRecipes.map(apiRecipeFormater);
      const dbRecipes = await Recipe.findAll({
        include: [
          {
            model: Diet,
            attributes: ['name'],
            through: { attributes: [] },
          },
        ],
      });
      const dbFormated = dbRecipes.map(dbRecipeFormater);
      const allRecipes = [...dbFormated, ...apiFormated];
      res.status(200).json(allRecipes);
    } catch (error) {
      next(error);
    }
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
      });
      const dbFormated = dbRecipeFormater(dbRecipe);
      res.status(200).json(dbFormated);
    } else {
      const apiRecipe = await getById(id);
      // Steps formating
      const steps = await apiRecipe.analyzedInstructions[0]?.steps.map(
        s => `${s.number}. ${s.step}`
      );
      const recipe = {
        id: apiRecipe.id,
        title: apiRecipe.title,
        image: apiRecipe.image,
        dishTypes: apiRecipe.dishTypes,
        diets: apiRecipe.diets,
        healthScore: apiRecipe.healthScore,
        summary: apiRecipe.summary.replaceAll(/<(“[^”]”|'[^’]’|[^'”>])*>/g, ''),
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
