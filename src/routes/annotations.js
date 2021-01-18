const router = require('express').Router();
const Annotations = require('../controllers/annotationsController');
const middleware = require('../middlewares/users');
const annotations = new Annotations();

router.get('/:user/:page', middleware.blockPrivateRoutes, annotations.show);
router.post('/:user/create', middleware.blockPrivateRoutes, annotations.create);
router.post('/:user/save/:id', middleware.blockPrivateRoutes, annotations.save);
router.get('/:user/delete/:id', middleware.blockPrivateRoutes, annotations.delete);

 module.exports = router;