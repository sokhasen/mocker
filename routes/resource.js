const router = require('express').Router();
const resourceModel = require('../models/resource');

router.get('/resources/projects/:pid', (req, res) => {
    const projectId = req.params.pid;

    if (!projectId) {
        res.status(400);
        res.json({
            message: "missing required param pid"
        });
    }
    else {
        resourceModel.getAll({ project_id: projectId}, (err, query) => {
            if (err) throw  err;
            res.json({
                data: query
            });
        });
    }
}) ;

router.get('/resources/:id', (req, res) => {
    const resourceId = req.params.id;

    if (!resourceId) {
        res.status(400);
        res.json({
            message: "missing required param pid"
        });
    }
    else {
        resourceModel.getAll({ _id: resourceId}, (err, query) => {
            if (err) throw  err;
            res.json({
                data: query
            });
        });
    }
}) ;

/*
*  create resources
*   params = {
*       "method": "get",
*       "project_id": "pid",
*       "response": {
*           "name": "field name",
*           "faker": "username"
*       }
*       "name": "my-resources"
*       "number": 1000
*   }
*/

router.post('/resources', (req, res) => {
    const method = req.body.method;
    const projectId = req.body.project_id;
    const response = req.body.response;
    const resourceName = req.body.name;
    const number = req.body.number || 100;


    const data = generateFakeResponse(response, number);
    console.log(data);


    if (!(method || projectId || response || resourceName)) {
        res.status(400);
        res.json({
            message: "missing required fields"
        });

    } else {
        let resource = {
            method: method,
            name: resourceName,
            project_id: projectId,
            response: data,
        };

        resourceModel.createResource(resource, (query) => {
            res.json({
               data: query
            });
        });
    }

}) ;

router.put('/resources/:id', (req, res) => {
    const method = req.body.method;
    const projectId = req.body.project_id;
    const response = req.body.response;
    const resourceId = req.params.id;
    const resourceName = req.body.name;

    if (!(method || projectId || response || resourceId ||resourceName)) {
        res.status(400);
        res.json({
            message: "missing required fields"
        });

    } else {
        let _id = {_id:resourceId};
        let resource = {
            method: method,
            name: resourceName,
            project_id: projectId,
            response: response,
        };

        resourceModel.update(_id, resource, (err, query) => {
            if (err) throw err;
            console.log(query);
            res.json({
                message: "resource has been updated"
            });
        });
    }
}) ;

router.delete('/resources/:id', (req, res) => {
    const resourceId = req.params.id;
    if (!resourceId)  {
        res.status(400);
        res.json({
            message: "missing required fields"
        });
    }
    else {
        resourceModel.delete(resourceId);
        res.json({
           message: "resource has been deleted"
        });
    }
}) ;

module.exports = router;


function dumpFaker(dumpFakerName) {
    const faker = require('../core/faker');
    let value = faker.factory(dumpFakerName);
    return value;
}

function  generateFakeResponse(responseFields, numberOfRecord) {
    let fakerList = [];
    for (let i= 1; i <= numberOfRecord; i++)
    {
        let fakerRow = { "id": i };
        for (let field of responseFields)
        {
            let propColumn = field.name;
            let fakerName = field.faker;

            fakerRow[`${propColumn}`] = dumpFaker(fakerName);

        }
        fakerList.push(fakerRow);
    }

    return fakerList;
}