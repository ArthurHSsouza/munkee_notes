const router = require("express").Router();
const Users = require('../controllers/usersController');
const users = new Users();

router.get('/signup', users.disableAuthRoutes, users.getSignup);
router.post('/signup', users.disableAuthRoutes, users.signup);
router.get('/login', users.disableAuthRoutes, users.getLogin);
router.post('/login', users.disableAuthRoutes, users.login);
router.get('/logout', users.logout);
router.get('/frgtPassword',users.disableAuthRoutes,users.getFrgtPassword);
router.post('/frgtPassword', users.disableAuthRoutes, users.frgtPassword);
router.post('/validateResetToken/:id',users.disableAuthRoutes, users.validateResetToken);
router.post('/resetPassword',users.disableAuthRoutes, users.resetPassword);

module.exports = router;