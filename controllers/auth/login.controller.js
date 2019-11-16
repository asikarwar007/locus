const UserModel = require('../../models/user/user.model')

module.exports = {
    
    userlogin: async (req, res) => {
        const payload = req.body
        let currdate = new Date()
        if (payload.social_id) {
            let userData = await UserModel.findOne({ social_id: payload.social_id })
            if (!userData) {
                let cred_email = validator.validate(payload.email);
                if (cred_email) {
                    // let cred_mobile = phone(payload.cred);
                    let userEmail = await UserModel.findOne({ email: payload.email })
                    if (userEmail) {
                        let updateLogin = await UserModel.findOneAndUpdate({ email: payload.email }, { $set: { social_id: payload.social_id, last_login: currdate, firebase_token: payload.firebase_token } }, { new: true })
                        const token = jwt.sign({
                            admin_id: userEmail._id,
                            login_type: "social",
                            loginDate: currdate,
                        }, config.SECRET, {
                            expiresIn: config.TokenExpiresIn
                        });
                        return res.send({
                            error: false,
                            message: "Welcome Back " + userEmail.name,
                            data: {
                                name: userEmail.name,
                                mobile: userEmail.mobile,
                                email: userEmail.email,
                                profile_img: userEmail.profile_img,
                                _id: userEmail._id
                            },
                            token: token
                        });
                    } else {
                        payload.last_login = currdate
                        let newUser = new UserModel(payload)
                        newUser.save((err, saveData) => {
                            let userwallet = new UserWalletModel({
                                user_id: saveData._id,
                                offer_amount: config.userRegisterAmount
                            })
                            userwallet.save((err, walletsave) => {
                                let userTxn = new UserTxnModel({
                                    user_id: saveData._id,
                                    txn_amount: config.userRegisterAmount,
                                    remaining_amount: config.userRegisterAmount,
                                    txn_type: 'c',
                                    remarks: 'new User Point ' + config.userRegisterAmount
                                })
                                userTxn.save((err, txnSave) => {
                                    const token = jwt.sign({
                                        user_id: saveData._id
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
                                                message: "Welcome " + saveData.name,
                                                data: {
                                                    name: saveData.name,
                                                    mobile: saveData.mobile,
                                                    email: saveData.email,
                                                    profile_img: saveData.profile_img,
                                                    _id: saveData._id
                                                },
                                                token: token
                                            });
                                        })
                                    })
                                })
                            })

                        })
                    }
                } else {
                    res.send({
                        error: true,
                        message: "Invalid email"
                    })
                }
            } else {
                const token = jwt.sign({
                    user_id: userData._id
                }, config.SECRET, {
                    expiresIn: config.TokenExpiresIn
                });
                UserModel.findOneAndUpdate({ social_id: payload.social_id }, { $set: { last_login: currdate, firebase_token: payload.firebase_token } }, { new: true }, (err, doc) => {
                    return res.send({
                        error: false,
                        message: "Welcome Back " + userData.name,
                        data: {
                            name: userData.name,
                            mobile: userData.mobile,
                            email: userData.email,
                            profile_img: userData.profile_img,
                            _id: userData._id
                        },
                        token: token
                    });
                })
            }
        } else {
            let cred_email = validator.validate(payload.cred);
            let cred_mobile = phone('+91' + payload.cred);
            console.log(cred_mobile)
            if (payload.password) {
                if (cred_email) {
                    let emaildata = await UserModel.findOne({ email: payload.cred })
                    if (emaildata) {

                        if (emaildata.password != "") {
                            if (emaildata.password == payload.password) {
                                const token = jwt.sign({
                                    userId: emaildata._id
                                }, config.SECRET, {
                                    expiresIn: config.TokenExpiresIn
                                });
                                UserModel.findOneAndUpdate({ email: payload.cred }, { $set: { last_login: currdate, firebase_token: payload.firebase_token } }, { new: true }, (err, doc) => {
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
                } else if (cred_mobile.length > 0) {
                    let mobiledata = await UserModel.findOne({ mobile: payload.cred })
                    if (mobiledata) {

                        if (mobiledata.password != "") {
                            if (mobiledata.password == payload.password) {
                                const token = jwt.sign({
                                    userId: mobiledata._id
                                }, config.SECRET, {
                                    expiresIn: config.TokenExpiresIn
                                });
                                UserModel.findOneAndUpdate({ email: payload.cred }, { $set: { last_login: currdate, firebase_token: payload.firebase_token } }, { new: true }, (err, doc) => {
                                    return res.send({
                                        error: false,
                                        message: "Welcome " + mobiledata.name,
                                        data: {
                                            name: mobiledata.name,
                                            mobile: mobiledata.mobile,
                                            email: mobiledata.email,
                                            profile_img: mobiledata.profile_img,
                                            _id: mobiledata._id
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
                }
            } else {
                return res.send({
                    error: true,
                    message: "Enter password"
                });
            }
        }
    },
    addUserData: async (req, res) => {
        let payload = req.body
        UserModel.findOne({ mobile: payload.mobile }, (err, findData) => {
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
                        let userwallet = new UserWalletModel({
                            user_id: document._id,
                            offer_amount: config.userRegisterAmount
                        })
                        userwallet.save((err, walletsave) => {
                            let userTxn = new UserTxnModel({
                                user_id: document._id,
                                txn_amount: config.userRegisterAmount,
                                remaining_amount: config.userRegisterAmount,
                                txn_type: 'c',
                                remarks: 'new User Point ' + config.userRegisterAmount
                            })
                            userTxn.save((err, txnSave) => {
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