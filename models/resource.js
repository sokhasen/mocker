const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema({
	project_id: {
		type: String,
		required:true
	},
	name: {
		type: String,
		required:true
	},
	method: {
		type:String,
		required: false,
		default: "GET"
	},
	response: {
		type: Array,
		required:true,
		default: []
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

module.exports.getAll = function (callback, limit) {
	Resource.find((err, query) => {
        if (err)
            throw err;
        callback(query);
    }).limit(limit);
};

module.exports.update = function(whereQuery, newValues, callback) {
    Resource.update(whereQuery, {$set: newValues}, (err, query) => {
        if (err)
            throw err;
        callback(query);
    });
};

module.exports.delete = function (resourceId) {
    try {
        Resource.deleteOne( { "_id" : ObjectId(resourceId) } );
    } catch (e) {
        throw e;
    }
};