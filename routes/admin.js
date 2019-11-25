const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../helpers/path');
const products = [];
// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.render('add-product', {pageTitle: 'Add Product', path: "/admin/add-product"});
});
// admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(req.body);
    res.redirect('/');
});

exports.routes = router;
exports.products = products;
