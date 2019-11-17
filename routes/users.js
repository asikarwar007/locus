var express = require('express');
var router = express.Router();

var userController = require('../controllers/user/user.controller')

router.post('/details', userController.getDatabyId)
router.post('/update', userController.updateuser)

module.exports = router;
