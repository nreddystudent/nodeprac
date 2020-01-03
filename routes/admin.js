const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
// admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);
router.post('/add-product', isAuth, adminController.addNewProduct);

// admin/add-product => POST
router.post('/delete-product', isAuth, adminController.deleteProduct);
router.get('/edit-product/:productId', isAuth, adminController.editProduct);

router.get('/products', isAuth, adminController.showProducts);
router.post('/edit-product', isAuth, adminController.updateProduct);

exports.routes = router;
