const ProductModel = require('../models/product');

exports.showProducts = (req, res, next) => {
    ProductModel.fetchAll((products) =>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    }); 
};
exports.showCart = (req, res, next) => {
    res.render('shop/cart', 
    { pageTitle: "My Cart",
        path:'/cart'
     });
}

exports.showCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    { pageTitle: "Checkout",
        path:'/checkout'
     });
}

exports.showDetails = (req, res, next) => {
    res.render('shop/product-details', { pageTitle: "List Product" });
}

exports.getIndex = (req, res, next) => {
    ProductModel.fetchAll((products) =>{
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    }); 
}