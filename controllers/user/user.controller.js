const userModel = require('../../models/user/user.model')

module.exports = {
    adduser: async (req, res) => {
        let body = req.body
        // let previousData = await userModel.findOne({ coupon: body.coupon, status: true })
        // if (!previousData) {
        //     return res.send({
        //         error: true,
        //         message: "Coupon Already Exist"
        //     })
        // }
        const addDetail = new userModel(body)
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
    getAlluser: async (req, res) => {
        let AllData = await userModel.find({
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
        const { user_id } = req.body
        let AllData = await userModel.findOne({
            _id: user_id
        }).select('mobile name email sex lat lng profileImg')
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
    updateuser: async (req, res) => {

        const payload = req.body
        let AllData = await userModel.findOneAndUpdate({
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
    deleteuser: async (req, res) => {
        const payload = req.body
        let AllData = await userModel.findOneAndUpdate({
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