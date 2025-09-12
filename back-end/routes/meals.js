const express = require('express');
const router = express.Router();
const { addMeals, getMeals, deleteMeal, updateMeal } = require('../controllers/MealsController');

router.post('/create/', addMeals);
router.get('/', getMeals);
router.delete('/delete/:id', deleteMeal);
router.put('/update/:id', updateMeal);

module.exports = router;
