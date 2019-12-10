const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: "Login",
		path: '/login',
		errorMessage: req.flash('error')
	});
};
exports.getSignUp = (req, res, next) => {
	res.render('auth/signup', {
		pageTitle: "Sign Up",
		path: '/signup'
	});
};
exports.postSignUp = (req, res, next) => {
	const email = req.body.email;
	const username = req.body.username
	const password = req.body.password;
	const confirm_password = req.body.confirm_password;
	User.findByField('email', email)
		.then(user => {
			if (user) {
				return res.redirect('/signup');
			}
			return bcrypt.hash(password, 12)
				.then(hashedPassword => {
					const newUser = new User(username, hashedPassword, email, {
						items: []
					});
					return newUser.save();
				})
				.then(result => {
					res.redirect('/login');
				})
		})
		.catch(err => {
			console.log(err);
		});
};
exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findByField('email', email)
		.then(user => {
			if (!user){
				req.flash('error', 'Invalid email or password');
				return res.redirect('/login');
			}
			bcrypt.compare(password, user.password)
			.then(doMatch =>{
				if (doMatch){
					req.session.isLoggedIn = true;
					req.session.user = user;
					return req.session.save((err) => {
						console.log(err);
						res.redirect('/');
					})
				}
				res.redirect('/login')
			})
			.catch(err => console.log(err));
		})
		.catch(err =>{
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
}