
const ProductModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', { pageTitle: 'Add Product', path: "/admin/add-product" });
};
exports.addNewProduct = (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imgURL = req.body.title;

	var product = new ProductModel(title, imgURL, description, price);
	product.save();
	res.redirect('/');
};

exports.showProducts = (req, res, next) => {
	ProductModel.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
		});
	});
};