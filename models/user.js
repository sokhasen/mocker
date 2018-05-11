var mongoose =  require("mongoose");
const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},
	token: {
		type: String
	},
	is_user: {
		type: Boolean,
		default: false
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(user,callback) {
	User.create(user,callback);
}

module.exports.is_existing = function( email, callback) {
	User.find({"email": email}, callback);
};
module.exports.getAllUser = function(callback,limit) {
	User.find(callback).limit(limit);
}

module.exports.updateUser = function(whereQuery, newValues, callback) {
	User.update(whereQuery, {$set: newValues}, callback);
};
