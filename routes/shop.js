const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.showProducts);

router.get('/cart', shopController.showCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.showOrders);

router.get('/checkout', shopController.showCheckout);

router.get('/products/:productId', shopController.showProduct);

module.exports = router;