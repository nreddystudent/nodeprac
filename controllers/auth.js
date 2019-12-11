const User = require('../models/user');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendGridTransport({
	auth: {
		api_key: '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'
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
				return req.session.save((err => {
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
			if (!user || !password) {
				req.flash('error', 'Invalid email or password');
				return req.session.save((err => {
					console.log(err);
					return res.redirect('/login');
				}))
			}
			bcrypt.compare(password, user.password)
				.then(doMatch => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							console.log(err);
							res.redirect('/');
						})
					}
					req.flash('error', 'Invalid email or password');
					return req.session.save((err => {
						console.log(err);
						return res.redirect('/login');
					}));
				})
				.catch(err => console.log(err));
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
}
exports.getReset = (req, res, next) => {
	res.render('auth/reset', {
		pageTitle: "Rest Password",
		path: '/signup',
		errorMessage: req.flash('error')
	});
}

exports.postReset = (req, res, next) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			return res.redirect('/reset');
		}
		const token = buffer.toString('hex');
		User.findByField('email', req.body.email)
			.then(user => {
				if (!user) {
					req.flash('error', 'No account found');
					req.session.save(err => {
						console.log(err);
						return res.redirect('/reset');
					})
				}
				user.resetTokenExpiration = Date.now() + 3600000;
				user.resetToken = token;
				return User.update(user);
			})
			.then(result => {
				res.redirect('/');
				console.log(req.body.email);
				return transporter.sendMail({
					to: req.body.email,
					from: 'shop@nodecomplete.com',
					subject: 'Password Reset',
					html: `<p>You requested for your password to be reset</p>
					<p>Click <a href="http://localhost:8080/reset/${token}">this link to change your password</p>`
				})
			})
			.catch(err => console.log(err))
	})
}

exports.getNewPassword = ((req, res, next) => {
	const token = req.params.token;
	User.findByField('resetToken', token)
		.then(user => {
			console.log(user);
			if (user.resetTokenExpiration < Date.now()) {
				req.flash('error', 'link has expired');
				return res.redirect('/reset');
			}
			res.render('auth/newPassword', {
				pageTitle: "Change Password",
				path: '/new-password',
				errorMessage: req.flash('error'),
				userId: user._id.toString(),
				passwordToken: token
			});
		})
		.catch(err => console.log(err));
});

exports.postNewPassword = (req, res, next) => {
	const newPassword = req.body.password;
	const userId = req.body.userId;
	const passwordToken = req.body.token;
	const token = req.params.token;
	let resetUser
	User.findById(userId)
		.then(user => {
			resetUser = user;
			if (user.resetTokenExpiration < Date.now()) {
				req.flash('error', 'link has expired');
				return res.redirect('/reset');
			}
			return bcrypt.hash(newPassword, 12);
		})
		.then((password) => {
			resetUser.password = password;
			resetUser.resetToken = undefined;
			resetUser.resetTokenExpiration = undefined;
			return User.update(resetUser)
		}).then((result) => {
			return res.redirect('/login');
		})
		.catch(err => console.log(err));
}