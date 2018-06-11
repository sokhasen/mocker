const router = require('express').Router();
const resource = require("../controllers/resource");

router.get('/resources/workspaces', (req, res) =>  res.status(400).json({message: "Server required param workspace id"}));
router.get('/resources/workspaces/:workspace_id', resource.getAllResources);
router.post('/resources', resource.createResource);
router.get('/resources/:id', resource.getOneResource);
router.put('/resources/:id', resource.updateResource);
router.delete('/resources/:id', resource.deleteResource);

module.exports = router;