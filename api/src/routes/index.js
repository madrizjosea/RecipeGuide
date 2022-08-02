const { Router } = require('express');
const { getAllRecipes } = require('../controllers/recipe.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', getAllRecipes);

module.exports = router;
