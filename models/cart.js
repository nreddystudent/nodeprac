const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, data) => {
		if (err) {
			return cb([]);
		}
		else {
			cb(JSON.parse(data));
		}
	})
}

module.exports = class Cart {
	static addProduct(id, price) {
		fs.readFile(p, (err, data) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(data);
			}
			const existProductIndex = cart.products.findIndex(p => (prod => prod.id === id));
			const existProduct = cart.products[existProductIndex];
			let updatedProduct;
			if (existProduct) {
				updatedProduct = { ...existProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
				cart.products[existProductIndex] = updatedProduct;
			}
			else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct]
			}
			cart.totalPrice = price + cart.totalPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			})
		})
	}
	
	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

} 