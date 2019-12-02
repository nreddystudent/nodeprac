const ProductModel = require('../models/product');
const CartModel = require('../models/cart');
exports.showProducts = (req, res, next) => {
    ProductModel.findAll()
    .then(products => {
        res.render('shop/product-list', {        
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
    .catch(err =>{
        console.log(err);
    });
};

exports.showProduct = (req, res, next) => {
    const prodId = req.params.productId;
    ProductModel.findByPk(prodId)
    .then((product) => {
        res.render('shop/product-details', { pageTitle: "Product Details", product: product, path: "/products" });
    })
    .catch(err =>{
        console.log(err);
    });
};
exports.showCart = (req, res, next) => {
        CartModel.getCart(cart => {
            ProductModel.fetchAll(products =>{
                const cartProducts = [];
                for (product of products){
                    const CartProductData = cart.products.find(prod => prod.id === product.id);
                    if (CartProductData){
                        cartProducts.push({productData: product, qty: CartProductData.qty});
                    }
                }
                res.render('shop/cart',
                    {
                        pageTitle: "My Cart",
                        path: '/cart',
                        cart: cartProducts
                    });
            })
        })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    ProductModel.findByID(prodId, product => {
        CartModel.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postDeleteItem = (req, res, next) => {
    const prodId = req.body.prodId;
    ProductModel.findByID(prodId, (product =>{
        const price = product.price;
        CartModel.deleteProduct(prodId, price);
        res.redirect('/cart'); 
    }))
}

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
    ProductModel.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err =>{
        console.log(err);
    });
}