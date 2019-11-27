const ProductModel = require('../models/product');
const CartModel = require('../models/cart');
exports.showProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};

exports.showProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModel.findByID(prodId, product => {
        res.render('shop/product-details', { pageTitle: "Product Details", product: product, path: "/products" });
    });
};
exports.showCart = (req, res, next) => {
        res.render('shop/cart',
            {
                pageTitle: "My Cart",
                path: '/cart',
            });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.findByID(prodId, product => {
        CartModel.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.showOrders = (req, res, next) => {
    res.render('shop/orders',
        {
            pageTitle: "My Orders",
            path: '/cart'
        });
};

exports.showCheckout = (req, res, next) => {
    res.render('shop/checkout',
        {
            pageTitle: "Checkout",
            path: '/checkout'
        });
};

exports.showDetails = (req, res, next) => {
    res.render('shop/product-details', { pageTitle: "List Product" });
}

exports.getIndex = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
}