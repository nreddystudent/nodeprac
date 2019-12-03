const Sequelize = require('sequelize');
const sequelize = require('../helpers/database');

const orderItem = sequelize.define('orderItem', {
	id:{
		type : Sequelize.INTEGER,
		autoIncrement : true,
		primaryKey: true
	},	
	quantity: Sequelize.INTEGER
});
module.exports = orderItem;