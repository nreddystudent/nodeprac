const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;
class Product {
	constructor(title, price, description, imgURL, id, userId) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.imgURL = imgURL;
		this._id = id ? new mongodb.ObjectId(id) : null;
		this.userId = userId;
	}
	save() {
		const db = getDb();
		let dbOp;
		if (this._id) {
			console.log("this", this);
			dbOp = db.collection('products').updateOne({
				_id: this._id
			}, {
				$set: this
			});
		} else {
			dbOp = db.collection('products').insertOne(this);
		}
		return dbOp
			.then(result => {
				console.log(result)
			})
			.catch(err => {
				console.log(err);
			})
	}
	static fetchAll() {
		const db = getDb();
		return db.collection('products').find().toArray()
			.then(products => {
				console.log(products);
				return products;
			})
			.catch(err => console.log(err))
	}
	static findById(prodId) {
		const db = getDb();
		return db.collection('products').find({
				_id: new mongodb.ObjectId(prodId)
			})
			.next()
			.then(product => {
				return product;
			})
			.catch(err => console.log(err))
	}
	static deleteById(id){
		const db = getDb();
		return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
		.then(result =>{
			console.log('deleted');
		})

		.catch(err => console.log(err));
	}
}
module.exports = Product;