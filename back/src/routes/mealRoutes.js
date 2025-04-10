// mealRoutes.js
const router = require('express-promise-router')();
const mealController = require('../controllers/mealController');
const auth = require('../middlewares/auth');
const verifyParams = require('../middlewares/verifyParams');

router.post('/meals/addFood/:ID_Meal', auth.authToken, verifyParams(['Name', 'ID_Food_API', 'Serving', 'Serving_Quantity', 'Serving_Total', 'Calories', 'Prot', 'Carb', 'Fat']), mealController.addFood);
router.delete('/meals/removeFood/:ID', auth.authToken, mealController.removeFood);
router.get('/meals/getAll/:ID_Day', auth.authToken, mealController.getAllMeals);
router.put('/meals/editFood/:ID', auth.authToken, verifyParams(['Serving_Quantity']), mealController.editFood);

module.exports = router;