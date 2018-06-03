const router = require('express').Router();
const projectModel = require('../models/project');

router.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    if (!projectId) {
        res.status(400);
        res.json({
            message: "missing required param id"
        });
    }
    else {
        projectModel.getProjectByID(projectId, (err, results) => {
            if (err) throw  err;

            res.status(200);
            res.json({
                data: results
            });
        });
    }
});

router.get('/projects/users/:uid', (req, res) => {
    const uid = req.params.uid;
    if (!uid) {
        res.status(400);
        res.json({
            message: "missing required params uid"
        })
    }
    else {
        projectModel.getProjectByUID(uid, (err, results) => {
            if (err) throw err;
            res.status(200);
            res.json({
                data: results
            });
        });
    }
});


router.post('/projects', (req, res) => {
    const projectName = req.body.name;
    const uid = req.body.uid;

    if (!(projectName && uid)) {
        res.status(400);
        res.json({
            message: "missing required fields"
        });
    }
    else {
        const project = {name: projectName, uid: uid};
        projectModel.createProject(project, (err, query) => {
            if (err) throw err;
            console.log(query);
            res.status(201);
            res.json({
                message: "project has been created"
            });
        });
    }
});

router.put('/projects/:id', (req, res) => {
    const  projectName = req.body.name;
    const projectId = req.params.id;

    if (!projectName) {
        res.status(400);
        res.json({
            message: "missing required field"
        });
    }
    else {
        projectModel.updateProject({_id: projectId}, {name: projectName}, (err, query) => {
            if (err) throw err;
            console.log(query);
            res.status(200);
            res.json({
                message: "project has been updated"
            });
        });
    }
});

router.delete('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    if (!projectId) {
        res.status(400);
        res.json({
            message: "missing required param"
        });
    }
    else {
        projectModel.delete(projectId, (err, query) => {
            if (err) throw err;
            console.log(query);
            res.json({
                message: 'project has been deleted'
            });
        });
    }
});

module.exports = router;