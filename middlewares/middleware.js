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