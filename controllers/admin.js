
const ProductModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', { pageTitle: 'Add Product', path: "/admin/add-product", editMode: false });
};
exports.addNewProduct = (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imgURL = req.body.imgURL;

	var product = new ProductModel(null, title, imgURL, description, price);
	product.save()
	.then(() => {
		res.redirect('/');
	})
	.catch(err => {
		console.log(err);
	});
};

exports.editProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/')
	}
	ProductModel.findByID(req.params.productId, (product) => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', { pageTitle: 'Edit Product', path: "/admin/edit-product", product: product, editMode: editMode });
	});

};

exports.updateProduct = (req, res, next) => {
	const productId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedDescription = req.body.description;
	const updatedImgURL = req.body.imgURL;
	const updatedPrice = req.body.price;
	var updatedProduct = new ProductModel(productId, updatedTitle, updatedImgURL, updatedDescription, updatedPrice);
	updatedProduct.save();
	res.redirect('/admin/products');
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

exports.deleteProduct = (req, res, next) => {
	ProductModel.deleteById(req.body.productId);
	res.redirect('/admin/products');
};