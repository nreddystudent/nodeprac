const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../helpers/path');
const Data = require("./admin");

router.get('/', (req, res, next) => {
    const products = Data.products;
    res.render('shop', {prods: products, docTitle: 'Shop'});
});

module.exports = router;