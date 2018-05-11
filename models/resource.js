var mongoose = require("mongoose");

var resourceSchema = mongoose.Schema({
	project_id: {
		type: String,
		required:true
	},
	name: {
		type: String,
		required:true
	},
	methods: {
		type:Array,
		required: false,
		default: ["GET"]
	},
	params {
		type: String,
		required:fase
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

var Resource = module.exports = mongoose.model('Resource', resourceSchema);
