const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.showProducts);

router.get('/cart', shopController.showCart);

router.get('/checkout', shopController.showCheckout);

module.exports = router;