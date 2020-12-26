const router = require('express').Router();
const Main = require('../controllers/mainController');
const main = new Main();

router.get('/',main.index);

module.exports = router;