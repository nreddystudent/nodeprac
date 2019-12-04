const Product = require('../models/product');

exports.showProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.showProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then((product) => {
            res.render('shop/product-details', {
                pageTitle: "Product Details",
                product: product,
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });
};
exports.showCart = (req, res, next) => {
    req.user.getCart()
    .then(cartData =>{
        console.log(cartData);
    })
        // .then(cart => {
        //     return cart.getProducts();
        // }).then(products => {
        //     res.render('shop/cart', {
        //         pageTitle: "My Cart",
        //         path: '/cart',
        //         cart: products
        //     });

        // }).catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product =>{
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err))
    // let fetchedCart;
    // let newQty = 1;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({
    //             where: {
    //                 id: prodId
    //             }
    //         })
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         if (product) {
    //             const oldQty = product.cartItem.quantity;
    //             newQty = oldQty + 1;
    //             return product;
    //         }
    //         return Product.findByPk(prodId)
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: {
    //                 quantity: newQty
    //             }
    //         });
    //     })
    //     .then(() => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err))
};

exports.postDeleteItem = (req, res, next) => {
    const prodId = req.body.prodId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.showOrders = (req, res, next) => {
    req.user.getOrders({ include: ['products'] })
        .then(orders => {
            console.log(orders);
            res.render('shop/orders', {
                pageTitle: "My Orders",
                path: '/cart',
                orders: orders
            });
        })
        .catch(err => console.log(err))
};

exports.showCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: "Checkout",
        path: '/checkout'
    });
};

exports.showDetails = (req, res, next) => {
    res.render('shop/product-details', {
        pageTitle: "List Product"
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {  
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity
                        }
                        return product;
                    }));
                })
                .catch(err => console.log(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};