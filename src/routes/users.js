const router = require("express").Router();
const Users = require('../controllers/usersController');
const uploadImage = require('../middlewares/multer');
const middleware = require('../middlewares/users');
const users = new Users();

router.get('/signup', middleware.disableAuthRoutes, users.getSignup);
router.post('/signup', middleware.disableAuthRoutes, users.signup);
router.get('/login', middleware.disableAuthRoutes, users.getLogin);
router.post('/login', middleware.disableAuthRoutes, users.login);
router.get('/logout', users.logout);
router.get('/frgtPassword',middleware.disableAuthRoutes, users.getFrgtPassword);
router.post('/frgtPassword', middleware.disableAuthRoutes, users.frgtPassword);
router.post('/validateResetToken/:id', middleware.disableAuthRoutes, users.validateResetToken);
router.post('/resetPassword',middleware.disableAuthRoutes, users.resetPassword);
router.get('/uploadImage', middleware.blockPrivateRoutes, users.getUploadImage);
router.post('/uploadImage', middleware.blockPrivateRoutes, uploadImage.single("profileImage"), users.uploadImage);

module.exports = router;