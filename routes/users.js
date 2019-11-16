var express = require('express');
var router = express.Router();

var userController = require('../controllers/user/user.controller')
var userAddressController = require('../controllers/user/userAddress.controller')
var userNotificationController = require('../controllers/user/userNotification.controller')
var TxnUserController = require('../controllers/user/TxnUser.controller')
var walletUserController = require('../controllers/user/walletUser.controller')


/* GET users listing. */

// router.get('/getuser',userController.getuser)
// router.post('/adduser',userController.addData)
// router.get('/mobilehome')

// router.post('/user_wallet', TxnUserController.userDetails)
// router.post('/user_details', userController.userDetails)
// router.post('/user_details_web', userController.userDetailsWeb)


router.post('/adduseraddress', userAddressController.adduserAddress)
router.post('/getuseralladdress', userAddressController.getAlluserAddress)
router.post('/getaddressbyid', userAddressController.getDatabyId)
router.post('/updateuseraddress', userAddressController.updateuserAddress)
router.post('/removeuseraddress', userAddressController.deleteuserAddress)

// router.post('/addserNotification', userNotificationController.addData)
router.post('/getUserNotification', userNotificationController.getAlluserNotification)
// router.post('/updateuseraddress', userNotificationController.updateDatabyId)
router.post('/removeUserNotification', userNotificationController.deleteuserNotification)


// router.post('/directory',userController.userdirectory)

module.exports = router;
