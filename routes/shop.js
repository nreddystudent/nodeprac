const path = require('path');
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

router.get('/', shopController.getIndex);

router.get('/products', shopController.showProducts);

router.get('/cart', isAuth, shopController.showCart);
router.post('/cart', isAuth, shopController.postCart);

router.post('/cart/delete-item', isAuth, shopController.postDeleteItem);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth, shopController.showOrders);

// router.get('/checkout', shopController.showCheckout);

router.get('/products/:productId', shopController.showProduct);

module.exports = router;