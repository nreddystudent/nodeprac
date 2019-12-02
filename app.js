const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const app = express();
const errorController = require('./controllers/errors');
const sequelize = require('./helpers/database');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.display404);
sequelize.sync()
.then(result =>{
})
.catch(err => {
	console.log(err);
}) 
app.listen(8080);