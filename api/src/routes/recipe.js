const { Router } = require('express');
const { getRecipes, getRecipeById } = require('../controllers/recipe.js');

const router = Router();

// Get requests linked to their respective controller
router.get('/', getRecipes);
router.get('/:id', getRecipeById);

// Post requests linked to their respective controller
// router.post('/', postRecipe);

module.exports = router;
