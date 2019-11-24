const express = require('express');
const app = express();


app.use('/add-product', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from Products</h1>'); 
});

app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from express</h1>'); 
});

app.listen(8080);
