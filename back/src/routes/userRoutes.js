const router         = require('express-promise-router')();
const userController = require('../controllers/userController');

const auth           = require('../middlewares/auth');
const verifyParams   = require('../middlewares/verifyParams');

router.post('/login'       , verifyParams(['Email','Password']), userController.loginUser);
router.post('/login-google', verifyParams(['Email','Password']), userController.loginUser);
router.post('/registrar'   , verifyParams(['Name','Password','Email']), userController.registerUser);
router.post('/token'  , auth.authToken, (req,res) => {res.status(200).send({sucesso:1})});

router.put('/edit-email'   , auth.authToken, verifyParams(['novo_email']), userController.editEmail);
router.put('/edit-password', auth.authToken, verifyParams(['senha_atual','nova_senha']), userController.editPassword);
router.put("/complete-profile", auth.authToken, verifyParams(['ProtGoal', 'CarbGoal', 'FatGoal', 'CaloriesGoal', 'Weight', 'Height', 'BirthDate', 'ActvLevel']), userController.completeUserProfile);
router.put('/user/weight', auth.authToken, verifyParams(['Weight']), userController.updateUserWeight);
router.put('/user/edit-profile', auth.authToken, userController.updateUserProfile);

router.get('/user/weight-updates', auth.authToken, userController.getAllWeightUpdates)
module.exports = router;