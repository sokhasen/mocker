const router = module.exports = require("express").Router();
const Deployment = require("../controllers/deployment");
router.all('/:stage/:resource/*', (req, res, next) => {
    const paths = req.path.split('/');
    if (req.subdomains.length === 0) {
        next();
    }

    const  staging  = req.params.stage;
    const resource = req.params.resource;

    res.json({
        data: paths
    });

});