const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;
const ObjectId = mongodb.ObjectId;
class User {
	constructor(username, email, cart, id) {
		this.username = username;
		this.email = email;
		this.cart = cart;
		this._id = id;
	}
	getCart() {
		const db = getDb();
		const prodIds = this.cart.items.map(i => {
			return i.productId;
		});
		return db.collection('products').find({
				_id: {
					$in: prodIds
				}
			}).toArray()
			.then(products => {
				return products.map(p => {
					return {
						...p,
						quantity: this.cart.items.find(i => {
							return i.productId.toString === p._id.toString()
						}).quantity
					};
				})
			})
			.catch(err => console.log(err));
	}
	addToCart(product) {
		const cartProductIndex = this.cart.items.findIndex(cp => {
			return cp.productId.toString() === product._id.toString();
		});
		let newQty = 1;
		const updatedCartItems = [...this.cart.items];

		if (cartProductIndex >= 0) {
			newQty = this.cart.items[cartProductIndex].quantity + 1;
			updatedCartItems[cartProductIndex].quantity = newQty
		} else {
			updatedCartItems.push({
				productId: new ObjectId(product._id),
				quantity: newQty
			});
		}
		const updatedCart = {
			items: updatedCartItems
		}
		const db = getDb();
		return db.collection('users').updateOne({
			_id: new ObjectId(this._id)
		}, {
			$set: {
				cart: updatedCart
			}
		});
	}
	save() {
		const db = getDb();
		return db.collection('users').insertOne(this)
	}
	static findById(userId) {
		const db = getDb();
		return db.collection('users').findOne({
			_id: new ObjectId(userId)
		});
	}
}

module.exports = User;