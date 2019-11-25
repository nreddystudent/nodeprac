const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const app = express();
const expHbs = require('express-handlebars');

app.engine('hbs', expHbs());
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle:'Page Not Found'});
});
app.listen(8080);
