const walletUserModel = require('../../models/user/walletUser.model')

module.exports = {
    addwalletUser: async (req, res) => {
        let body = req.body
        // let previousData = await walletUserModel.findOne({ coupon: body.coupon, status: true })
        // if (!previousData) {
        //     return res.send({
        //         error: true,
        //         message: "Coupon Already Exist"
        //     })
        // }
        const addDetail = new walletUserModel(body)
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
    getAllwalletUser: async (req, res) => {
        let AllData = await walletUserModel.find({
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
        let AllData = await walletUserModel.findOne({
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
    updatewalletUser: async (req, res) => {

        const payload = req.body
        let AllData = await walletUserModel.findOneAndUpdate({
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
    deletewalletUser: async (req, res) => {
        const payload = req.body
        let AllData = await walletUserModel.findOneAndUpdate({
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