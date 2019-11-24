const express = require('express');

const router = express.Router();
// admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.send('<html><body><form method="POST" action="/admin/add-product"><input type="text" name="title"><button type="submit">Add Product</button></form></body></html>'); 
});
// admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;