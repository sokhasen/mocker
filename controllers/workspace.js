const workspace = require("../models/workspace");

const controller  =  {};
controller.createWorkspace = function(req, res) {

    const name = req.body.name;
    const deploy_name = req.body.deploy_name;
    const description = req.body.description;
    const user_id = req.body.uid || req.body.user_id;

    if (!name || !deploy_name || !description || !user_id) {
        res.status(400);
        return res.json({
            message: "missing required fields"
        });
    }
    else {
        let data =  {
            name: name,
            deploy_name: deploy_name,
            description: description,
            uid: user_id
        };
        workspace.createWorkSpace(data, (query) => {
            res.status(200);
            res.json({
                message: "The workspace has been created successfully!",
                workspace_id: query
            });
        });
    }
};

controller.getAllWorkspaces =  function (req, res) {
    workspace.getAllWorkspaces({}, null, (data) => {
        res.status(200);
        return res.json({
            workspaces: data
        });
    });
};

module.exports = controller;