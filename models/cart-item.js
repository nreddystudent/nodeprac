const Sequelize = require('sequelize');
const sequelize = require('../helpers/database');

const CartItem = sequelize.define('cartItem', {
	id:{
		type : Sequelize.INTEGER,
		autoIncrement : true,
		primaryKey: true
	},	
	quantity: Sequelize.INTEGER
});
module.exports = CartItem; 	 