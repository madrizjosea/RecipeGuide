require('dotenv').config();
const { Diet } = require('../db.js');

const getAllDiets = async (req, res, next) => {
  try {
    const dietTypes = [
      'dairy free',
      'fodmap friendly',
      'gluten free',
      'ketogenic',
      'lacto ovo vegetarian',
      'lacto vegetarian',
      'ovo vegetarian',
      'paleolithic',
      'pescatarian',
      'primal',
      'vegan',
      'vegetarian',
      'whole 30',
    ];
    
    dietTypes.forEach(async diet => await Diet.findOrCreate({ where: { name: diet } }));

    const diets = await Diet.findAll();
    res.status(201).json(diets)
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllDiets,
};
