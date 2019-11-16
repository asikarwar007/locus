const userNotificationModel = require('../../models/user/userNotification.model')

module.exports = {
    adduserNotification: async (req, res) => {
        let body = req.body
        // let previousData = await userNotificationModel.findOne({ coupon: body.coupon, status: true })
        // if (!previousData) {
        //     return res.send({
        //         error: true,
        //         message: "Coupon Already Exist"
        //     })
        // }
        const addDetail = new userNotificationModel(body)
        let saveData = await addDetail.save()
        if (saveData) {
            return res.send({
                error: false,
                message: "success"
            })
        } else {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        }


    },
    getAlluserNotification: async (req, res) => {
        let AllData = await userNotificationModel.find({
            status: true
        })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: AllData,
                message: "success"
            })
        }
    },
    getDatabyId: async (req, res) => {
        const { id } = req.body
        let AllData = await userNotificationModel.findOne({
            _id: id
        })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                data: AllData,
                message: "success"
            })
        }
    },
    updateuserNotification: async (req, res) => {

        const payload = req.body
        let AllData = await userNotificationModel.findOneAndUpdate({
            _id: payload._id
        }, {
            $set:
                payload
        })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                message: "success"
            })
        }
    },
    deleteuserNotification: async (req, res) => {
        const payload = req.body
        let AllData = await userNotificationModel.findOneAndUpdate({
            _id: payload._id
        }, {
            $set: {
                status: false
            }
        })
        if (!AllData) {
            return res.send({
                error: true,
                message: "something went wrong"
            })
        } else {
            res.send({
                error: false,
                message: "success"
            })
        }

    }
}