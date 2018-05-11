var router = require("express").Router();
var user = require("./../models/user.js");
var nodemailer = require('nodemailer');

router.put('/user/:id', (req, res) => {
	const getID = req.params.id

	if (getID == 123) {
		res.json({
			code: 200,
			user_id: getID
		})
	}
	else {
		res.json({
			code: 400,
			message: "missing user id"
		});
	}
})

router.get('/:resource', function(req,res){
	console.log(req.subdomains)
	let resource = req.params.resource

	//query

})

router.post('/login', (req, res, next) => {




});


router.post('/register', (req, res, next) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	if (username && email && password) {
		const credential_user = {
			"username": username,
			"email": email,
			"password": password
		};

		// CHECK USER WHEHER EXISTING IN SYSTEM
		user.is_register(email, (err, old_user) => {
			if (err) {

				res.status(500);
				res.json({
					"statusCode": 500,
					"message": "500 internal server"
				});
			}
			else {
				if (old_user.length > 0 && false) {
					res.status(409);
					res.json({
						statusCode: 409,
						message: "user has already existing!"
					});
				}
				else {
					user.createUser(credential_user, ( err, new_user) => {
						if (err) {
							res.status(500);
							res.json({
								"statusCode": 500,
								"message": "500 internal server. user cannot create when server has errored"
							});
						}
						else {
							// Send mail to current address
							sendMail(new_user, (err, info) => {
								if (err) {
									// retry 2
									sendMail(new_user, (err, info) => {
										if (err) {
											// retry 3
											sendMail(new_user, (err, info) => {
												if (err) {
													console.log(err);
													res.status(500);
													res.json({
														"statusCode": 502,
														"message": "Cannot send mail by retring 3 times"
													});
												}
												else {
													console.log(info);
													res.status(200);
													res.json({
														statusCode: 200,
														user: info
													});
												}
											});
										}
										else {
											console.log(info);
											res.status(200);
											res.json({
												statusCode: 200,
												user: info
											});
										}
									});
								}
								else {
									console.log(info);
									res.status(200);
									res.json({
										statusCode: 200,
										user: info
									});
								}
							});
						}
					});

				}

			}
		});

	}
	else {
		res.status(400).json({
			statusCode: 400,
			message: "required fields missing!"
		});
	}
});

router.get('/account', (req, res, next) => {
	user.getAllUser((err, users) => {
		if (err) {
			throw err;
		}
		console.log(users);
		res.status(200);
		res.json({
			statusCode: 200,
			users: users,
			token:key,
			secret:secret
		});
	});
});

module.exports = router;

function sendMail (new_user, callback) {
	var transporter = nodemailer.createTransport({
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
			'<a href="http://google.com">www.api-generator.com/user/confirmation?email='+new_user.email+'&token='+new_user.token+'</a>'+
			'<button type="button">Confirm</button>'
	};

	transporter.sendMail(mailOptions, function(error, info) {
		callback(error, info);
	});
}
