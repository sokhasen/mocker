const resource  = require("../models/resource");

const controller = {};

module.exports = controller;



controller.createResource =  (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const workspace_id = req.body.workspace_id;


    if (!name || !workspace_id) {
        res.status(400);
        res.json({
            message: "missing required fields"
        });
    }
    else {
        let data = {
            name: name,
            description: description,
            workspace_id: workspace_id
        };

        resource.createResource(data, (query) => {
            res.status(201);
            res.json({
                resource: query
            });
        });
    }
};


controller.getAllResources = (req, res) => {
    const workspace_id = req.params.workspace_id;
    resource.getAllResourcesByWorkspaceId(workspace_id, (data) => {
        res.status(200);
        return res.json({
            resources: data
        });
    });
};

controller.getOneResource = (req, res) => {
  const resourceId = req.params.id;
  if (!resourceId) {
      res.status(400);
      res.json({
          message: "missing required fields"
      })
  }
  else
  {
      resource.getOneResource(resourceId, query => {
          res.json({
              resource: query
          });
      });
  }
};

controller.updateResource =  (req, res) => {
    const resourceId = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const workspace_id = req.body.workspace_id;

    if (!resourceId || !description || !workspace_id || !name) {
        res.status(400);
        res.json({
            message: "missing required fields"
        });
    }
    else
    {
        let param = { name:name, description:description, workspace_id:workspace_id};
        resource.updateResource(resourceId, param, (query) => {
            resource.getOneResource(resourceId, query => {
                res.json({
                    message: "The resource has been updated successfully!",
                    resource: query
                });
            });
        })
    }
};

controller.deleteResource =  (req, res) => {
  const resourceId = req.params.id;
  resource.deleteResource(resourceId, query => {
     res.json({
         message: "The resource has been deleted successfully!"
     });
  });
};

