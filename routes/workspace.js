const router = require('express').Router();
const workspace = require("../controllers/workspace");


router.get('/workspaces/users/:user_id', workspace.getAllWorkspaces);
router.post('/workspaces', workspace.createWorkspace);
router.get('/workspaces/:id', workspace.getOneWorkspace);
router.put('/workspaces/:id', workspace.updateWorkspace);
router.delete('/workspaces/:id', workspace.destroyWorkspace);

module.exports = router;