const mongoose = require('mongoose')

const schema = mongoose.Schema
const TxnUserScheme = schema({
    userId: { type: schema.Types.ObjectId, ref: 'users' },
    txnAmount: { type: Number, default: 0 },
    remainingAmount: { type: Number, default: 0 },
    txnType: { type: String, default: '' },

    bankTxnId: { type: String, default: '' },
    txnId: { type: String, default: '' },
    txnMethod: { type: String, default: '' },
    txnStatus: { type: String, default: '' },
    remarks: { type: String, default: '' },

    status: { type: Boolean, default: true }

}, {
        timestamps: true
    })
module.exports = mongoose.model("txnUser", TxnUserScheme, "txnUser")