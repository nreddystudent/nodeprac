	const Sequelize = require('sequelize');
	const sequelize = require('../helpers/database');

	const Cart = sequelize.define('cart', {
		id:{
			type : Sequelize.INTEGER,
					autoIncrement : true,
			primaryKey: true
		}	
	});
	module.exports = Cart;