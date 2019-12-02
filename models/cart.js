const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, data) => {
		if (err) {
			return cb([]);
		} else {
			cb(JSON.parse(data));
		}
	})
}

module.exports = class Cart {
	static addProduct(id, price) {
		fs.readFile(p, (err, data) => {
			let cart = {
				products: [],
				totalPrice: 0
			};
			if (!err) {
				cart = JSON.parse(data);
			}
			const existProductIndex = cart.products.findIndex(prod => prod.id === id);
			const existProduct = cart.products[existProductIndex];
			let updatedProduct;
			if (existProduct) {
				updatedProduct = {
					...existProduct
				};
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existProductIndex] = updatedProduct;
			} else {
				updatedProduct = {
					id: id,
					qty: 1
				};
				cart.products = [...cart.products, updatedProduct]
			}
			cart.totalPrice = cart.totalPrice + +price;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			})
		})
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(p, (err, data) => {
			if (err) {
				return;
			}
			const fileContent = JSON.parse(data);
			const updatedCart = {
				...fileContent
			};
			const product = updatedCart.products.find(prod => prod.id === id);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
			updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
			fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}
	static getCart(cb) {
		fs.readFile(p, (err, data) => {
			const cart = JSON.parse(data);
			if (err) {
				cb(null);
			} else {
				cb(cart);
			}
		});
	}
}