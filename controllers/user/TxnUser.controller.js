const TxnUserModel = require('../../models/user/TxnUser.model')

module.exports = {
    addTxnUser: async (req, res) => {
        let body = req.body
        // let previousData = await TxnUserModel.findOne({ coupon: body.coupon, status: true })
        // if (!previousData) {
        //     return res.send({
        //         error: true,
        //         message: "Coupon Already Exist"
        //     })
        // }
        const addDetail = new TxnUserModel(body)
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
    getAllTxnUser: async (req, res) => {
        let AllData = await TxnUserModel.find({
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
        let AllData = await TxnUserModel.findOne({
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
    updateTxnUser: async (req, res) => {

        const payload = req.body
        let AllData = await TxnUserModel.findOneAndUpdate({
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
    deleteTxnUser: async (req, res) => {
        const payload = req.body
        let AllData = await TxnUserModel.findOneAndUpdate({
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