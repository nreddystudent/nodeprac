const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const app = express();
const errorController = require('./controllers/errors');
const sequelize = require('./helpers/database');
const Products = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	User.findByPk(1)
		.then(user => {
			req.user = user;
			next();
		})
})
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.display404);

Products.belongsTo(User, {
	constraints: true,
	onDelete: 'CASCADE'
});
User.hasMany(Products);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Products, {
	through: CartItem
});
Products.belongsToMany(Cart, {
	through: CartItem
});

sequelize.sync()
// sequelize.sync({
// 		force: true
// 	})
	.then(result => {
		return User.findByPk(1)
	})
	.then(user => {
		if (!user){
			return User.create({
				name: "nolin",
				email: "nolin.reddy@gmail.com"
			});
		}
		return user;
	})
	.then(user => {
		 return user.createCart();
	})
	.then(cart => {
		app.listen(8080);
	})
	.catch(err => {
		console.log(err);
	});