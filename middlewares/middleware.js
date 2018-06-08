const jwt = require("jsonwebtoken");
const User = require('../models/user');

module.exports.checkSubDomainName =  function ( req, res, next) {
    const subDomainNames = req.subdomains;
    if (subDomainNames.length <= 0) {
        next();
    }
    else {
        let firstPortion = subDomainNames[0];
        console.log("finding user...");
        //    query find user
        User.findByUsername(firstPortion, query => {
            if (query.length !== 0) {
                console.log(query);
                next();
            } else {
                res.status(404);
                return res.json({
                    message: "invalid URL"
                });
            }
        });
    }
};

module.exports.guardAuth  =  function (req, res, next) {
    // skip guard authorization
    if (req.path === "/users/login" || req.path === "/users/register") {
        next();
    }
    else {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, 'secret', function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }

};