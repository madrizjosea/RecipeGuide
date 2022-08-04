const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoutes = require('./recipe.js');
const dietRoutes = require('./diet.js')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRoutes);
router.use('/diets', dietRoutes)

module.exports = router;
