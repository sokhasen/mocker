const mongoose =  require("mongoose");
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

const User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(user,callback) {
	User.create(user,callback);
};

module.exports.is_existing = function( email, callback) {
	User.find({"email": email}, callback);
};

module.exports.findByUsername = function( username, callback) {
    User.find({ "username": username}, (err, query) => {
        if (err)
            throw err;
        callback(query);
    });
};

module.exports.getAllUser = function(callback,limit) {
	User.find(callback).limit(limit);
};

module.exports.getOneUser = function(user_id, callback) {
	User.findOne({_id: user_id}, (err, result) => {
		if (err) throw  err;
		callback(result);
	})
};

module.exports.updateUser = function(whereQuery, newValues, callback) {
	User.update(whereQuery, {$set: newValues}, callback);
};
