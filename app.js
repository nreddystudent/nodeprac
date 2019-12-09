const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const path = require('path');
const app = express();
const errorController = require('./controllers/errors');
const MongoConnect = require('./helpers/database').MongoConnect;
const User = require('./models/user');
const session = require('express-session');
const mongdbStore = require('connect-mongodb-session')(session);
const MONGODB_URI = 'mongodb+srv://root:9021@cluster0-rhmgm.mongodb.net/shop'
const store = new mongdbStore({
	uri: MONGODB_URI,
	collection: 'sessions'
});
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(session({
	secret: 'my secret',
	resave: false,
	saveUninitialized: false,
	store: store
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then(user => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch(err => console.log(err));
})
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.display404);

MongoConnect(() => {
	app.listen(8080);
})