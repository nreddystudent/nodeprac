const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const app = express();
const errorController = require('./controllers/errors');
const MongoConnect = require('./helpers/database').MongoConnect;
const User = require('./models/user');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	User.findById("5de76e6e29aa20edc4ecf31b")
		.then(user => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
})
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.display404);

MongoConnect(() =>{
	app.listen(8080);
})