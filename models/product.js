const products = [];
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
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
module.exports = class Product {
	constructor(title, imgURL, description, price) {
		this.title = title;
		this.imgURL = imgURL;
		this.description = description;
		this.price = price;
	}
	save() {
		const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		})
	}
	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
}