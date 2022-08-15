require('dotenv').config();
const { Diet } = require('../db.js');
const { getDiets } = require('../helpers/requestHelpers.js');

const getAllDiets = async (req, res, next) => {
  try {
    // Recipes contain diet types
    const recipes = await getDiets();

    // Parsing the diet types into an iterable
    const dietsFromRecipes = new Set(
      recipes.map(recipe => recipe.diets).flat()
    );
    const dietTypes = Array.from(dietsFromRecipes);

    // Finding or creating each diet type
    const rawDietTypes = dietTypes.map(dietType => {
      return new Promise((resolve, reject) => {
        resolve(
          Diet.findOrCreate({
            where: { name: dietType },
          })
        );
        reject(error => next(error));
      });
    });
    await Promise.all(rawDietTypes);

    // Sending back all the diet types
    const dbDiets = await Diet.findAll();
    const diets = dbDiets.map(diet => diet.name);

    res.status(201).json(diets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDiets,
};
