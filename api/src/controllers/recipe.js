require('dotenv').config();
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
const {
  getAll,
  getByTitle,
  getById,
  formater,
} = require('./helpers');

// GET request to fetch all recipes
const getRecipes = async (req, res, next) => {
  const { title } = req.query;
  // Title query handler
  if (title) {
    try {
      const apiRecipes = await getByTitle(title);
      const apiFormated = apiRecipes.map(formater);

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
      const allRecipes = [...apiFormated, ...dbRecipes];

      !allRecipes.length
        ? res.status(404).send('This recipe does not exist')
        : res.status(200).json(allRecipes);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const apiRecipes = await getAll();
      const apiFormated = apiRecipes.map(formater);

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
      res.status(200).json(dbRecipe);
    } else {
      const apiRecipe = await getById(id);

      // Steps formating
      const steps = await apiRecipe.analyzedInstructions[0]?.steps.map(
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
};
