const getDb = require('../helpers/database').getDb;
class Product{
	constructor(title, price, description, imgURL){
		this.title = title;
		this.description = description;
		this.price = price;
		this.imgURL = imgURL
	}
	save(){

	}
}

const Product = sequelize.define('product', {
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull : false,
		primaryKey : true
	},
	title:{
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	imgURL:{
		type: Sequelize.STRING,
		allowNull: false
	},
	description:{
		type: Sequelize.STRING,
		allowNull: false
	}

});

module.exports = Product;