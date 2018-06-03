const router = require('express').Router();
const workspace = require("../controllers/workspace");


router.get('/workspaces', workspace.getAllWorkspaces);
router.post('/workspaces', workspace.createWorkspace);
router.get('/workspaces/:id');
router.put('workspaces/:id');
router.delete('workspaces/:id');

module.exports = router;