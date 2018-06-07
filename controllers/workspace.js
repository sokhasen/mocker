const workspace = require("../models/workspace");

const controller  =  {};

module.exports = controller;

controller.getAllWorkspaces =   (req, res) => {
    const user_id = req.params.user_id;
    if (!user_id)
        return res.status(400).json({
                    message: "Param user id is null, server required user id!"
                });

    workspace.getAllWorkspaces({uid: user_id}, data => {
        res.status(200);
        return res.json({
            workspaces: data
        });
    });
};

controller.createWorkspace = (req, res) => {

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
        workspace.createWorkSpace(data, query => {
            res.status(200);
            res.json({
                message: "The workspace has been created successfully!",
                workspace: query
            });
        });
    }
};


controller.updateWorkspace =  (req, res) => {
    const workspace_id = req.params.id;
    const name = req.body.name;
    const deploy_name = req.body.deploy_name;
    const description = req.body.description;

    if (!workspace_id || !name || !deploy_name) {
        res.status(400);
        res.json({
            message: "missing required workspace id"
        });
    }
    else
    {
        let whereQuery = {"_id": workspace_id};
        let param = { name: name, deploy_name: deploy_name, description: description};
        workspace.updateWorkspace(whereQuery, param, query => {
            workspace.getOneWorkspace(workspace_id, query => {
                res.json({
                    message: "The workspace has been updated successfully!",
                    workspace: query
                });
            });
        });
    }
};

controller.getOneWorkspace = (req, res) => {
  const workspace_id = req.params.id || 0;
  if (!workspace_id)
        return res
            .status(400)
            .json({
                message: "param workspace id is null, server required workspace id!"
            });
  workspace.getOneWorkspace(workspace_id, query => {
     res.json({
         workspace: query
     });
  });
};

controller.destroyWorkspace =  (req, res) => {
  const workspaceId = req.params.id;
    if (!workspaceId)
        return res
            .status(400)
            .json({
                message: "param workspace id is null, server required workspace id!"
            });
  workspace.deleteWorkspace(workspaceId, query => {
      res.json({
          message: "The workspace has been delete successfully!"
      });
  })
};