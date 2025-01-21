const router         = require('express-promise-router')();
const userController = require('../controllers/userController');

const auth           = require('../middlewares/auth');
const verifyParams   = require('../middlewares/verifyParams');

router.post('/login'       , verifyParams(['Email','Password']), userController.loginUser);
router.post('/login-google', verifyParams(['Email','Password']), userController.loginUser);
router.post('/registrar'   , verifyParams(['Name','Password','Email']), userController.registerUser);
router.post('/token'  , auth.authToken, (req,res) => {res.status(200).send({sucesso:1})});

router.put('/edit-name'    , auth.authToken, verifyParams(['novo_login']), userController.editName);
router.put('/edit-email'   , auth.authToken, verifyParams(['novo_email']), userController.editEmail);
router.put('/edit-password', auth.authToken, verifyParams(['senha_atual','nova_senha']), userController.editPassword);
router.put("/complete-profile", auth.authToken, verifyParams(['Email', 'ProtGoal', 'CarbGoal', 'FatGoal', 'CalGoal', 'Weight', 'Height', 'Age', 'FitnessLvl']), userController.completeUserProfile);

module.exports = router;