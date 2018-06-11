const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const user = require("../models/user");
const controller = module.exports = {};

controller.userLogin = (req, res) => {
    const email = req.body.email;
    const attemptPassword = req.body.password;

    if (email && attemptPassword) {
        user.is_existing(email, (err, result) => {
            if (err) {
                throw err;
            }

            if (result.length === 0) {
                res.status(404);
                res.json({
                    message: "user not Found"
                });
            }
            else {
                const savedUser = result[0];
                const correctPassword = __comparePassword(savedUser.password, attemptPassword);
                const correctEmail = savedUser.email === email;
                if (correctPassword && correctEmail) {
                    const payload = {user_id: savedUser._id};
                    const token = __createToken(payload);
                    res.json({
                        token: token
                    });
                }
                else {
                    res.status(400);
                    res.json({
                        message: "Email or password is incorrect!"
                    });
                }
            }
        });
    }
    else {
        res.status(400);
        res.json({
            status: "error",
            statusCode: 400,
            message: "required missing field"
        });
    }
};

controller.userRegister = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username && email && password) {
        const passwordEncryption = __hashPassword(password);
        const new_user = {username: username, email: email, password: passwordEncryption, token: null, is_user: false};

        user.is_existing(email, (err, result) => {
            if (err) {
                throw err;
            }

            if (result && result.length > 0) {
                res.status(409);
                res.json({
                    message: "user has already existed account"
                });
            }
            else {
                user.createUser(new_user, (err, result) => {

                    if (err) {
                        throw err;
                    }
                    // create token
                    const payload = {user_id: result._id};
                    const token = __createToken(payload);
                    const key = {"email": email};
                    const newValue = {"token": token};

                    user.updateUser(key, newValue, (err, result) => {
                        console.log("saved token");
                        if (err) throw err;
                        new_user.token = token;
                        new_user.agent = __getClient(req);
                        console.log("Mail is sending...");
                        __sendMail(new_user, (err, info) => console.log("mail has been send"));
                        console.log("send response");
                        res.status(200);
                        res.json({
                            success: true,
                            status: "success",
                            token: token,
                            message: "a new user has been created successfully"
                        });
                    });
                    /*end updateUser()*/
                });
                /*end createUser()*/
            }
        });
        /*end is_existing()*/
    }
    else {
        res.status(400);
        res.json({
            success: false,
            status: "error",
            statusCode: 400,
            message: "required missing field"
        });
    }
};

controller.getUserProfile = (req, res) => {
    const user_id = req.decoded.user_id;

    if (!user_id) {
        res.status(403);
        res.json({
            success: false,
           message: "user id doesn't provide to server"
        });
    }
    else {
        user.getOneUser(user_id, (query) => {
            let user = {
                "is_user": query.is_user,
                "created_at": query.created_at,
                "updated_at": query.updated_at,
                "user_id": query._id,
                "username": query.username,
                "email": query.email
            };
           res.json({
               "success": true,
               "user": user
           });
        });
    }
};

controller.resendEmail = (req, res) => {
    const user_email = req.body.email;
    if (user_email) {
        user.is_existing(user_email, (err, result) => {
            if (err)
                throw err;

            const savedUser = result[0];
            if (savedUser.token) {
                savedUser.agent = __getClient(req);
                __sendMail(savedUser, (err, info) => {
                    console.log("mail resend");
                    console.log(err, info);
                    res.json({
                        message: "Mail has been resent!"
                    })
                });

            }
            else {
                res.status(403);
                res.json({
                    message: "you have already activated"
                });
            }
        });
    }
    else {
        res.json({
            message: "required email"
        });
    }

};

controller.confirmationEmail = (req, res) => {
    console.log(req.subDomain);
    const { email, ip, agent, token, timestamp } = req.query;
    user.is_existing(email, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const savedUser =  result[0];
            if (savedUser.token) {
                user.updateUser({ email: email}, { token: null, is_user: true }, (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.json({
                        message: "confirmed successfully"
                    })
                });
            }
            else {
                res.status(403);
                res.json({
                    message: "you have already activated"
                });
            }
        }
        else {
            res.status(404);
            res.json({
                message: "user not found"
            });
        }
    });
};


// login helper

const crypto = require('crypto');

function __genRandomString(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
}

function __hashPassword(password) {
    try {
        var salt = bcrypt.genSaltSync(16);
        return bcrypt.hashSync(password, salt);
    } catch (e) {
        throw e;
    }
}

function __comparePassword(savedHash, passwordAttempt) {
    return bcrypt.compareSync(passwordAttempt, savedHash);
}

function __sendMail (new_user, callback) {
    var nodeMailer = require("nodeMailer");
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gapi.teamate@gmail.com',
            pass: 'Sokha@123'
        }
    });

    var mailOptions = {
        from: 'gapi.teamate@gmail.com',
        to: new_user.email,
        subject: 'Activate Your Account',
        html:
        '<h1> API Generator </h1>'+
        '<p>Hello, <b>'+new_user.username+'</b> ! please, click below button to activate you account! </p>'+
        '<p>Prevent from mialious please copy link and run in iconito tab.</p>'+
        '<a href="http://google.com">www.api-generator.com/user/confirmation?email='+new_user.email+'&ip='+new_user.agent.ip+'&agent='+new_user.agent.browser+'&token='+new_user.token+'&timestamp='+Date.now()+'</a>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error)
            throw error;
        callback(null, info);
    });
}

function __getClient(req){
    const agent = req.headers['user-agent'];
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return {
        ip: ip,
        browser: agent
    };
}

function __createToken (payload) {
    return jwt.sign(payload, 'secret', { expiresIn: '1day' });
}




