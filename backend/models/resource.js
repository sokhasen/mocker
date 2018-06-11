const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
	workspace_id: {
		type: String,
		required:true
	},
	name: {
		type: String,
		required:true
	},
	description: {
		type: String,
		required: false
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

const Resource = module.exports = mongoose.model('Resource', resourceSchema);

module.exports.createResource = function(resource,callback) {
    Resource.create(resource, (err, query) => {
        if (err)
            throw err;
        callback(query);
    });
};

module.exports.getAllResourcesByWorkspaceId = function (workspace_id, callback, limit) {
	Resource.find({ workspace_id: workspace_id}, (err, query) => {
        if (err)
            throw err;
        callback(query);
    }).limit(limit);
};

module.exports.updateResource = function(resourceId, newValues, callback) {
    Resource.update({ _id: resourceId}, {$set: newValues}, (err, query) => {
        if (err)
            throw err;
        callback(query);
    });
};

module.exports.deleteResource = function (resourceId, callback) {
    Resource.deleteOne( { _id : resourceId } , (err, query) => {
    	if (err) throw err;
    	callback(query);
	});
};

module.exports.getOneResource = function (resourceId, callback) {
    Resource.findOne({ _id: resourceId}, (err, query) => {
        if (err)
            throw err;
        callback(query);
    })
};
module.exports.getOneResourceByWorkspaceIdAndResourceName  = function (workspaceId, resourceName, callback) {
	Resource.findOne({
		workspace_id: workspaceId,
		name: resourceName
	}, (error, result) => {
		if (error) throw error;
		callback(result);
	});
};