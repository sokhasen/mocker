const router = module.exports = require("express").Router();
const user = require("../controllers/user");

router.post('/users/register', user.userRegister);
router.post('/users/login',user.userLogin);
router.get('/users/account', user.getUserProfile);
router.post('/user/mail/resend', user.resendEmail);
router.get("/users/confirmation", user.confirmationEmail);