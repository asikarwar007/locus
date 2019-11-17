const UserModel = require('../../models/user/user.model')
const validator = require("email-validator");
const phone = require('phone');
const jwt = require('jsonwebtoken');
const config = require('../../config/common.config');
const helper = require('../../halpers/promotion.helper');

module.exports = {
    
    userlogin: async (req, res) => {
        const payload = req.body
        let currdate = new Date()
     
        if (payload.password) {
            if (payload.cred) {
                let emaildata = await UserModel.findOne({ username: payload.cred })
                if (emaildata) {
                    if (emaildata.password != "") {
                        if (emaildata.password == payload.password) {
                            const token = jwt.sign({
                                userId: emaildata._id
                            }, config.SECRET, {
                                expiresIn: config.TokenExpiresIn
                            });
                            UserModel.findOneAndUpdate({ username: payload.cred }, { $set: { last_login: currdate, firebase_token: payload.firebase_token } }, { new: true }, (err, doc) => {
                                return res.send({
                                    error: false,
                                    message: "Welcome " + emaildata.name,
                                    data: {
                                        name: emaildata.name,
                                        mobile: emaildata.mobile,
                                        email: emaildata.email,
                                        profile_img: emaildata.profile_img,
                                        _id: emaildata._id
                                    },
                                    token: token
                                });
                            })

                        } else {
                            return res.send({
                                error: true,
                                message: "Wrong ID or password"
                            });
                        }
                    } else {
                        return res.send({
                            error: true,
                            message: "login with gmail or facebook and generate new password"
                        });
                    }

                } else {
                    return res.send({
                        error: true,
                        message: 'User does not exist'
                    });
                }
            } else{
                return res.send({
                    error: true,
                    message: "Enter username"
                });
            }
        } else {
            return res.send({
                error: true,
                message: "Enter password"
            });
        }
    },
    addUserData: async (req, res) => {
        let payload = req.body
        let useradetais = await UserModel.findOne({ username: payload.username, status:true })
        if (useradetais){
           return res.send({
                error: true,
                message: "username already exits"
            })
        }
        UserModel.findOne({ contact: payload.contact }, (err, findData) => {
            if (err) {
                res.send({
                    error: true,
                    message: "something went wrong"
                })
            }
            if (!findData) {
                payload.status = true
                // const { name, mobile, firebase_token, sex, email, password } = req.body
                const addDetail = UserModel(payload)
                addDetail.save((error, document) => {
                    if (error) {
                        res.send({
                            error: true,
                            message: "something went wrong"
                        })
                    } else {
                        const token = jwt.sign({
                            user_id: document._id
                        }, config.SECRET, {
                            expiresIn: config.TokenExpiresIn
                        });
                        let firetoken = [payload.firebase_token]
                        let title = 'welcome '
                        let body = 'welcome to houzzify'
                        helper.sendPush(firetoken, title, body, (err, status) => {
                            helper.sendSMS(payload.mobile, body, (err, status) => {
                                return res.send({
                                    error: false,
                                    message: "Welcome " + document.name,
                                    data: {
                                        name: document.name,
                                        mobile: document.mobile,
                                        email: document.email,
                                        profile_img: document.profile_img,
                                        _id: document._id
                                    },
                                    token: token
                                });
                            })
                        })
                        // const token = jwt.sign({
                        //     user_id: document._id
                        // }, config.SECRET, {
                        //         expiresIn: config.TokenExpiresIn
                        //     });
                        // res.send({
                        //     error: false,
                        //     data: {
                        //         name: document.name,
                        //         mobile: document.mobile,
                        //         email: document.email,
                        //         _id: document._id
                        //     },
                        //     message: "Welcome " + document.name,
                        //     token: token
                        // })
                    }
                })
            } else {
                res.send({
                    error: true,
                    message: "User already exit"
                })
            }
        })
    },
}