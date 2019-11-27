const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');
// admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// admin/add-product => POST
router.post('/add-product', adminController.addNewProduct);
router.get('/edit-product/:productId', adminController.editProduct);

router.get('/products', adminController.showProducts);


exports.routes = router;
