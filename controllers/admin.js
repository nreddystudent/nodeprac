const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add Product',
		path: "/admin/add-product",
		editMode: false
	});
};
exports.addNewProduct = (req, res, next) => {
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imgURL = req.body.imgURL;
	const product = new Product(title, price, description, imgURL, null, req.user); 
	product.save()
		.then(result => {
			res.redirect('/admin/products');
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
	Product.findById(req.params.productId)
		// ProductModel.findByPk(req.params.productId)
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
	const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImgURL, productId);
	product.save().then(result => {
			console.log("updated Product");
			res.redirect('/admin/products');
		})
		.catch(err => {
			console.log(err);
		});
};

exports.showProducts = (req, res, next) => {
	Product.fetchAll()
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
	Product.deleteById(req.body.productId)
	.then(() => {
		console.log("destroyed product");
		res.redirect('/admin/products');
	})
	.catch(err =>{
		console.log(err);
	});
};