
const ProductModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', { pageTitle: 'Add Product', path: "/admin/add-product", editMode: false });
};
exports.addNewProduct = (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imgURL = req.body.imgURL;
	ProductModel.create({
		title: title,
		price: price,
		imgURL: imgURL,
		description: description
	}).then(result =>{
		console.log(result);
	})
	.catch(err => {
		console.log(err);
	})
};

exports.editProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect('/')
	}
	ProductModel.findByPk(req.params.productId)
	.then((product) => {
		if (!product) {
			return res.redirect('/');
		}
		res.render('admin/edit-product', { 
			pageTitle: 'Edit Product', 
			path: "/admin/edit-product", 
			product: product, 
			editMode: editMode 
		});
	});

};

exports.updateProduct = (req, res, next) => {
	const productId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedDescription = req.body.description;
	const updatedImgURL = req.body.imgURL;
	const updatedPrice = req.body.price;
	ProductModel.findByPk(productId)
	.then(product =>{
		product.title = updatedTitle;
		product.price = updatedPrice;
		product.imgURL = updatedImgURL;
		product.description = updatedDescription;
		return product.save();
	}).then(result =>{
		console.log("updated Product");
		res.redirect('/admin/products');
	})
	.catch(err => {
		console.log(err);
	});
};

exports.showProducts = (req, res, next) => {
	ProductModel.findAll()
	.then(products => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/products',
		});
	})
	.catch(err => {
		console.log(err)
	});
};

exports.deleteProduct = (req, res, next) => {
	ProductModel.deleteById(req.body.productId);
	res.redirect('/admin/products');
};