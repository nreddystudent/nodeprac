const getDb = require('../helpers/database').getDb;
class Product{
	constructor(title, price, description, imgURL){
		this.title = title;
		this.description = description;
		this.price = price;
		this.imgURL = imgURL
	}
	save(){
		 const db = getDb();
		 db.collection('products').insertOne(this)
		 .then(result =>{
			 console.log(result)
		 })
		 .catch(err => {
			 console.log(err);
		 })
	}
}
module.exports = Product;