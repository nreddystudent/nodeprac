const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: "Login",
		path: '/login',
		isAuthenticated: false
	});
};
exports.getSignUp = (req, res, next) => {
	res.render('auth/signup', {
		pageTitle: "Sign Up",
		path: '/signup',
		isAuthenticated: false
	});
};
exports.postSignUp = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirm_password = req.body.confirm_password;
	res.render('auth/signup', {
		pageTitle: "Sign Up",
		path: '/signup',
		isAuthenticated: false
	});
};
exports.postLogin = (req, res, next) => {
	User.findById("5de7b4f71ddfc2543937fe7a")
	.then(user =>{
		req.session.isLoggedIn = true;
		req.session.user = user;
		req.session.save((err) => {
			console.log(err);
			res.redirect('/');
		})
	});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
}