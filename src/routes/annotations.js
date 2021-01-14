const router = require('express').Router();
const Annotations = require('../controllers/annotationsController');
const annotations = new Annotations();

router.get('/:user/:page', Annotations.blockPrivateRoutes, annotations.show);
router.post('/:user/create',Annotations.blockPrivateRoutes, annotations.create);
router.post('/:user/save/:id',Annotations.blockPrivateRoutes, annotations.save);
router.get('/:user/delete/:id', Annotations.blockPrivateRoutes, annotations.delete);

 module.exports = router;