const getDb = require('../helpers/database').getDb;
class Validity {
	constructor(req, res, next) {
		this.req = req.body;
		this.res = res;
		this.next = next;
		console.log("heeeeere");
		console.log(this);
	}
	isEmail(req, res, next){
		let data = this.req[this.name];
		if (!data.match(/@.*\.com/)) {
			req.flash('error', 'Email Address Invalid');
			req.session.save((err) => {
				console.log(err);
				return res.redirect('/signup');
			})
		}
		console.log(this);
		return this.next;
	}
	isAlphaNumeric() {
		let data = req.body[this.name];
		if (!data.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)) {
			req.flash('error', 'Password Invalid');
			req.body.ValidateErrors.push('Password Invalid');
			return req.session.save((err) => {
				console.log(err);
				return res.redirect('/signup');
			})
		}
	}
	isEmpty = () => {
		let data = req.body[this.name];
		if (!data) {
			console.log('errror is empty');
		}
	}
	isLen = () => {

	}
	next = () => {
		console.log("here");
		return this.next;
	}

}

module.exports.check = (req, res, next) => {
	return new Validity(req, res, next);
};