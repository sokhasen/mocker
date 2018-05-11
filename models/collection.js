var mongoose = require("mongoose");

var collectionSchema = mongoose.Schema({
	resource_id: {
		type: String,
		required:true
	},
	documents: {
		type: Array,
		required:true
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

var Collection = module.exports = mongoose.model('Collection', collectionSchema);
