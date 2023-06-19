//маршруты нашего приложения
const { Router } = require('express');
const { getMeal, saveMeals, deleteMeal, editMeal } = require('./MealController');
const router = Router();

router.get('/', getMeal);
router.post('/saveMeals', saveMeals);
router.put('/editMeal', editMeal);// можно вместо put исп-ть метод post или др-й (кроме get), т.к. сам
//put не изменился. Главное, не забыть в postman поменять запрос с put на post

// router.delete('/deleteMeal', deleteMeal); //delete не работает с axios, т.к. в нем нельзя указать параметр (id) 
router.post('/deleteMeal', deleteMeal); 

module.exports = router;