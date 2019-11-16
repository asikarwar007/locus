var express = require('express');
var router = express.Router();

var userController = require('../controllers/user/user.controller')


/* GET users listing. */

// router.get('/getuser',userController.getuser)
// router.post('/adduser',userController.addData)
// router.get('/mobilehome')

// router.post('/user_wallet', TxnUserController.userDetails)
// router.post('/user_details', userController.userDetails)
// router.post('/user_details_web', userController.userDetailsWeb)


router.post('/details', userController.getDatabyId)

module.exports = router;
