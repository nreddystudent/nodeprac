const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = (callback) => {
	MongoClient.connect('mongodb+srv://root:9021@cluster0-rhmgm.mongodb.net/shop?retryWrites=true&w=majority')
		.then(client => {
			console .log('connected');
			_db = client.db();
			callback(client);
		})
		.catch(err => {
			console.log(err)
			throw  err;
		});
};

const getDb = () => {
	if(_db) {
		return _db;
	}
	throw 'no database found';
}

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;