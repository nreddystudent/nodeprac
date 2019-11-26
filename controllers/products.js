const ProductModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: "/admin/add-product" });
};
exports.addNewProduct = (req, res, next) => {
    var product = new ProductModel(req.body.title);
    product.save();
    res.redirect('/');
};

exports.showProducts = (req, res, next) => {
    const products = ProductModel.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'S hop',
        path: '/',
    });
};