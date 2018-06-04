const mongoose  = require("mongoose");

const MethodSchema = mongoose.Schema({
    resource_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: "GET"
    },
    response_code: {
        type: String,
        required: false,
        default: 200
    },
    response_type: {
        type: String,
        required: false,
        default: "application/json"
    },
    response_body: {
        type: Object,
        required: false,
        default: {
            "json": undefined,
            "xml": undefined,
            "text": undefined,
            message: "No any response"
        }
    },
    request_params: {
        type: Object,
        required: false,
        default: null
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


const Method = module.exports = mongoose.model("Method", MethodSchema);

module.exports.createMethod =  (methodObject, callback) => {
  Method.create(methodObject, (err, query) => {
      if (err) throw err;
      callback(query);
  });
};


module.exports.getAllMethods = (resourceId, callback) => {
  Method.find({ resource_id: resourceId}, (err, query) => {
     if (err) throw err;
     callback(query);
  });
};

module.exports.getOneMethod = (methodId, callback) => {
    Method.findOne({_id:methodId}, (err, query) => {
        if (err) throw err;
        callback(query);
    });
};

module.exports.updateMethod = (methodId, methodObject, callback) => {
  Method.update({_id:methodId}, {$set: methodObject}, (err, query) => {
      if (err) throw  err;
      callback(query);
  });
};

module.exports.deleteMethod = (methodId, callback) => {
    Method.deleteOne({_id: methodId}, (err, query) => {
        if (err) throw err;
        callback(query);
    });
};