const { Router } = require('express');
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  getRecipeByTitle,
} = require('../controllers/recipe.js');

const router = Router();

// Get requests linked to their respective controller
router.get('/', getRecipes);
router.get('/:id', getRecipeById);
router.get('/title', getRecipeByTitle);

// Post requests linked to their respective controller
router.post('/', createRecipe);

module.exports = router;
