const getDb = require('../helpers/database').getDb;
var Validity = {
	check: (name)=>{
		this.name = name;
	},
	isEmail: (req, res, next) => {
		let data = req.body[this.name];
		if (!data.match(/@.*\.com/)){
			req.flash('error', 'Email Address Invalid');
			return req.session.save((err) =>{
				console.log(err);
				return res.redirect('/signup');
			})
		}
		next();
	},
	isAlphaNumeric: (req, res, next) =>{
		let data = req.body[this.name];
		if (!data.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)){
			req.flash('error', 'Password Invalid');
			req.body.ValidateErrors.push('Password Invalid');
			return req.session.save((err) =>{
				console.log(err);
				return res.redirect('/signup');
			})
		}
		next();
	},
	isEmpty: (req, res, next) => {
		let data = req.body[this.name];
		if (!data){
			console.log('errror is empty');
		}
	},
	isLen: (req, res, next) =>{

	}

}

module.exports = Validity;