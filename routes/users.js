const router = require("express").Router();
const Users = require('../controllers/usersController');
const users = new Users();

router.get('/signup', users.disableAuthRoutes, users.getSignup);
router.post('/signup', users.disableAuthRoutes, users.signup);
router.get('/login', users.disableAuthRoutes, users.getLogin);
router.post('/login', users.disableAuthRoutes, users.login);
router.get('/logout', users.logout);


module.exports = router;