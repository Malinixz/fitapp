const router         = require('express-promise-router')();
const dayController  = require('../controllers/dayController');

const auth           = require('../middlewares/auth');
const verifyParams   = require('../middlewares/verifyParams');

router.get('/days', auth.authToken, dayController.getAllDays);
router.get('/days/:Date', auth.authToken, dayController.getDayDetails);
router.put('/days/:ID/progress', auth.authToken, verifyParams(['ProtTotal', 'CarbTotal', 'FatTotal', 'CaloriesTotal']), dayController.updateDayProgress);
router.put('/days/:ID/goals', auth.authToken, verifyParams(['ProtGoal', 'CarbGoal', 'FatGoal', 'CaloriesGoal']), dayController.updateDayGoals);
router.put('/days/:Date/steps', auth.authToken, verifyParams(['Steps']), dayController.updateDaySteps);

module.exports = router;