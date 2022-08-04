const { Router } = require('express');
const { getAllDiets } = require('../controllers/diet.js');

const router = Router();

// Diet requests linked to their respective controller
router.get('/', getAllDiets);

module.exports = router;