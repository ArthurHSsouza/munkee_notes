const router = require('express').Router();
const Annotations = require('../controllers/annotationsController');
const annotations = new Annotations();

router.get('/:user', Annotations.blockPrivateRoutes,annotations.main)
router.get('/:user/show',Annotations.blockPrivateRoutes,annotations.show);
router.post('/:user/save',Annotations.blockPrivateRoutes,annotations.save);
router.get('/:user/delete/:id',);

 module.exports = router;