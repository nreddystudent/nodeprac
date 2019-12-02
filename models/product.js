const products = [];
const CartModel = require('./cart');
const db = require('../helpers/database');
module.exports = class Product {
	constructor(id, title, imgURL, description, price) {
		this.id = id;
		this.title = title;
		this.imgURL = imgURL;
		this.description = description;
		this.price = price;
	}
	save() {
		return db.execute("INSERT INTO products(title, price, description, imgURL)VALUES(?, ?, ?, ?)", [this.title, this.price, this.description, this.imgURL]);
	}
	static fetchAll() {
		return db.execute("SELECT * FROM products")
	}

	static deleteById(id) {
		
	};

	static findByID(id) {
		return db.execute(`SELECT * FROM products WHERE products.id=?`, [id]);
	}
}