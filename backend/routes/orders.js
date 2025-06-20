const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../middleware/ensureLoggedIn');
const orderCtrl = require('../controllers/order');

router.use(ensureLoggedIn);


router.get('/basket', orderCtrl.getBasket);
router.post('/add', orderCtrl.addToBasket);
router.post('/checkout', orderCtrl.checkout);

module.exports = router;