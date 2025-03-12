const router         = require('express-promise-router')();
const dayController  = require('../controllers/dayController');

const auth           = require('../middlewares/auth');
const verifyParams   = require('../middlewares/verifyParams');

router.post('/days', auth.authToken, verifyParams(['Date', 'ProtTotal', 'ProtGoal', 'CarbTotal', 'CarbGoal', 'FatTotal', 'FatGoal', 'CaloriesTotal', 'CaloriesGoal']), dayController.createDay);
router.get('/days', auth.authToken, dayController.getAllDays);
router.get('/days/:ID/details', auth.authToken, dayController.getDayDetails);
router.get('/days/:Date', auth.authToken, dayController.getOneDay);
router.put('/days/:ID/progress', auth.authToken, verifyParams(['ProtTotal', 'CarbTotal', 'FatTotal', 'CaloriesTotal']), dayController.updateDayProgress);
router.put('/days/:ID/goals', auth.authToken, verifyParams(['ProtGoal', 'CarbGoal', 'FatGoal', 'CaloriesGoal']), dayController.updateDayGoals);

module.exports = router;