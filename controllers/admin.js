
const ProductModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', { pageTitle: 'Add Product', path: "/admin/add-product", editMode: false});
};
exports.addNewProduct = (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imgURL = req.body.imgURL;

	var product = new ProductModel(title, imgURL, description, price);
	product.save();
	res.redirect('/');
};

exports.editProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode){
		return res.redirect('/')
	}
	ProductModel.findByID(req.params.productId, (product) => {
		if (!product){
			return res.redirect('/');
		}
		console.log(product);
		res.render('admin/edit-product', { pageTitle: 'Edit Product', path: "/admin/edit-product", product: product, editMode: editMode });
	});

};

exports.updateProduct = (res, req, next) => {
	
}

exports.showProducts = (req, res, next) => {
	ProductModel.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
		});
	});
};