const faker = require("../core/faker");
const method = require("../models/method");
const controller = module.exports =  {};

controller.destroyMethod = (req, res) => {
    const methodId = req.params.id;
    method.deleteMethod(methodId, query => res.json({ message: "The method has been deleted!"}));
};

controller.updateMethod = (req, res) => {
    const resource_id =  req.body.resource_id;
    const name = (req.body.name || "GET").toLocaleUpperCase();
    const response_code = req.body.response_code || 200;
    const response_type = req.body.response_type || "application/json";
    const response_body = req.body.response_body;
    const request_params = req.body.request_params;
    const methodId = req.params.id;

    if (!resource_id || !response_body) {
        res.status(400);
        res.json({
            message: "missing required fields"
        })
    }
    else {
        let object =  {
            name:name,
            resource_id:resource_id,
            response_code:response_code,
            response_type:response_type,
            response_body:response_body,
            request_params:request_params
        };

        method.updateMethod(methodId, object, query => {
            method.getOneMethod(methodId, method =>  res.json({
                message: "The method has been updated",
                method: method
            }));

        });
    }
};

controller.getOneMethod = (req, res) => {
    const methodId = req.params.id;
    method.getOneMethod(methodId, method => res.json({ method }))
};

controller.createNewMethod = (req, res)  => {
    const resource_id =  req.body.resource_id;
    const name = (req.body.name || "GET").toLocaleUpperCase();
    const response_code = req.body.response_code || 200;
    const response_type = req.body.response_type || "application/json";
    const response_body = req.body.response_body;
    const request_params = req.body.request_params;
    const total = req.body.total || 10;


    // DUMP RESPONSE DATA
    const dumpResponseData = faker.mappingResponseBody(response_body, response_type, total);

    if (!resource_id || !response_body) {
        res.status(400);
        res.json({
            message: "missing required fields"
        })
    }
    else {
        let object =  {
            name:name,
            resource_id:resource_id,
            response_code:response_code,
            response_type:response_type,
            response_body:dumpResponseData,
            request_params:request_params
        };
        method.createMethod(object, query => {
            res.status(201);
            res.json({
                method: query
            });
        });
    }
};

controller.getAllMethods = (req, res)  => {
    const resourceId = req.params.resource_id;
    if (!resourceId) {
        res.status(400);
        res.json({
            message: "required resource param"
        });
    }
    else {
        method.getAllMethods(resourceId, query => res.json({ methods: query}))
    }
};
