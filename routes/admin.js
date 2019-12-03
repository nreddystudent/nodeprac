const express = require('express');
const path = require('path');
const router = express.Router();
const adminController = require('../controllers/admin');
// admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.addNewProduct);

// admin/add-product => POST
// router.post('/delete-product', adminController.deleteProduct);
// router.get('/edit-product/:productId', adminController.editProduct);


// router.get('/products', adminController.showProducts);
// router.post('/edit-product', adminController.updateProduct);

exports.routes = router;
