const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const path = require('path');
const app = express();
const errorController = require('./controllers/errors');
const MongoConnect = require('./helpers/database');


app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
	// User.findByPk(1)
	// 	.then(user => {
	// 		req.user = user;
	// 		next();
	// 	})
})
app.use('/admin', adminRoutes.routes);
// app.use(shopRoutes);

app.use(errorController.display404);

MongoConnect(() =>{
	app.listen(8080);
})