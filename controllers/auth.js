const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTransport({
	auth: {
		api_key:'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'
	}
})) 
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
		path: '/signup',
		errorMessage: req.flash('error')
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
				req.flash('error', 'E-mail already exists. Please pick a different one.');
				return req.session.save((err =>{
					console.log(err);
					return res.redirect('/signup');
				}));
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
					return transporter.sendMail({
						to: email,
						from: 'shop@nodecomplete.com',
						subject: 'Signup succeeded',
						html: "<h1>You've successfully signed up</h1>" 
					})
				}).catch(err => console.log(err))
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
			if (!user || !password){
				req.flash('error', 'Invalid email or password');
				return req.session.save((err =>{
					console.log(err);
					return res.redirect('/login');
				}))
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
				req.flash('error', 'Invalid email or password');
				return req.session.save((err =>{
					console.log(err);
					return res.redirect('/login');
				}));
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