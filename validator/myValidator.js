const getDb = require('../helpers/database').getDb;
class Validity{
	constructor(name, req, res, next){
		this.name = name;
		this.req = req.body;
		this.res = res;
		this.next = next;
	}
	isEmail = () => {
		console.log(this.req);
		let data = this.req[this.name];
		if (!data.match(/@.*\.com/)){
			req.flash('error', 'Email Address Invalid');
			return req.session.save((err) =>{
				console.log(err);
				return res.redirect('/signup');
			})
		}
		
	}
	isAlphaNumeric = () =>{
		let data = req.body[this.name];
		if (!data.match(/^(?=.*[a-zA-Z])(?=.*[0-9])/)){
			req.flash('error', 'Password Invalid');
			req.body.ValidateErrors.push('Password Invalid');
			return req.session.save((err) =>{
				console.log(err);
				return res.redirect('/signup');
			})
		}
	}
	isEmpty = () => {
		let data = req.body[this.name];
		if (!data){
			console.log('errror is empty');
		}
	}
	isLen = () =>{

	}
	next = () =>{
		next();
	}

}

module.exports.check = (name) =>{
	return 
	return new Validity()
}