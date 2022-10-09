const { Diet } = require('../db.js');
const { getDiets } = require('../helpers/requestHelpers.js');

const getAllDiets = async (req, res, next) => {
  try {
    let dbDiets = await Diet.findAll();

    // Sending back all the diet type names from DB
    if (dbDiets.length > 0) {
      const diets = dbDiets.map(diet => diet.name);
      return res.status(200).json(diets);
    }

    // If there are no diets created
    // Request recipes containing diet types
    const recipes = await getDiets();

    // Parsing the diet types into an iterable
    const dietsFromRecipes = new Set(
      recipes.map(recipe => recipe.diets).flat()
    );
    const dietTypes = Array.from(dietsFromRecipes);

    // Finding or creating each diet type
    const rawDietTypes = dietTypes.map(dietType => {
      return new Promise((resolve, reject) => {
        Diet.findOrCreate({
          where: { name: dietType },
        });
        resolve('Diet created successfully');
        reject(error => next(error));
      });
    });
    await Promise.all(rawDietTypes);

    // Returning just diet names
    dbDiets = await Diet.findAll();
    const diets = dbDiets.map(diet => diet.name);
    res.status(200).json(diets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDiets,
};
