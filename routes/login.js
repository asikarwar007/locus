var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth/login.controller')



router.post('/user/login', authController.userlogin);
router.post('/user/register', authController.addUserData)

module.exports = router;
