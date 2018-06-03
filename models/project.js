const mongoose = require("mongoose");
const crypto = require("crypto");
const base64url = require('base64url');

const ProjectSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    key: {
        type: String,
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

const Project = module.exports = mongoose.model('Project', ProjectSchema);


module.exports.createProject = function( project, callback) {
	Project.create(project, callback);
};

module.exports.getProjectByUID = function( uid, callback) {
	Project.find({ "uid":uid }, callback);
};

module.exports.getProjectByID = function( project_id, callback) {
	Project.findOne({ '_id': project_id}, callback);
};

module.exports.updateProject = function(whereQuery, newProject, callback) {
	Project.update(whereQuery, newProject, callback);
};

module.exports.generateNewKey = function(project_id, callback) {
    const newKey = base64url(crypto.randomBytes(64));
    Project.update({ "_id": `ObjectId("${project_id})"`}, { "key": newKey});
};

module.exports.delete = function(project_id, callback) {

    Project.deleteOne({ "_id" : ObjectId(project_id) }, callback);
};