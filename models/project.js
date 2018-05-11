var mongoose = require("mongoose");
var crypto = require("crypto");
var base64url = require('base64url');

var ProjectSchema = mongoose.Schema({
	uid: {
		type: String,
		required:true
	},
	name: {
		type: String,
		required:true
	},
	key: {
		type:String,
		required: true,
		default: base64url(crypto.randomBytes(64))
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

var Project = module.exports = mongoose.model('Project', ProjectSchema);


module.exports.create = function( project, callback) {
	Project.create(project, callback);
};

module.exports.getProjectByUID = function( uid, callback) {
	Project.find({ "uid":uid }, callback);
};

module.exports.getProjectByID = function( project_id, callback) {
	Project.find({ "_id":project_id }, callback);
};

module.exports.updateProject = function(whereQuery, newProject, callback) {
	Project.update(whereQuery, newProject, callback);
};

module.exports.generateNewKey = function(project_id, callback) {
	const newKey = base64url(crypto.randomBytes(64);
	Project.update({ "_id":project_id }, { "key": newKey});
};
