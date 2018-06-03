const mongoose =  require("mongoose");

const WorkspaceSchema =  mongoose.Schema({
    uid: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true
    },
    deploy_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    is_deleted: {
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


const Workspace = module.exports = mongoose.model("Workspace", WorkspaceSchema);

module.exports.createWorkSpace  = function (workspace, callback) {
    Workspace.create(workspace, (error, query) => {
        if (error) throw error;
        callback(query);
    });
};

module.exports.getAllWorkspaces  = function (condition, limit, callback) {
    Workspace.find(condition, (error, query) => {
        if (error) throw error;
        callback(query);
    }).limit(limit);
};