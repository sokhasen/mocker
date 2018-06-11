const Workspace =  require("../models/workspace");
const Resource = require("../models/resource");
const Method = require("../models/method");

const controller = module.exports = {};

controller.getDeployUrl = (req, res) => {
    const deployName = req.deployName ||  null;
    const resourceName = req.params.resourceName;
    const staging = req.params.staging;

    if (!deployName && !resourceName) {
        res.status(400);
        res.json({
            message: "Deploy name or staging is missing in url"
        });
    }
    else {
        Workspace.getOneWorkspaceByDeployName( deploy_name, workspace => {
           if (!workspace) {
               res.status(404);
               res.json({
                  message: "URL not found"
               });
           }
           else {
               //TODO get one resource by wokspace id
               Resource.getOneResourceByWorkspaceIdAndResourceName(workspace._id, resourceName, resource => {
                  if (!resource) {
                      res.status(404);
                      res.json({
                          message: resourceName + "resource not found"
                      });
                  }
                  else {
                      res.json({
                          message: "get method"
                      });
                  }
               });
           }
        });
    }

};

controller.updateDeployUrl = (req, res) => {

};
