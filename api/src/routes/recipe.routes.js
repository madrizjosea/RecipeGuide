const { Router } = require('express');
const { getAllRecipes, getRecipeById } = require('../controllers/recipe.controller.js');

const router = Router();

// Recipe requests linked to their respective controller
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

module.exports = router;
