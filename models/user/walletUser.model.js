const mongoose = require('mongoose')

const schema = mongoose.Schema
const WalletUserScheme = schema({

    userId: { type: schema.Types.ObjectId, ref: 'users'  },
    amount: { type: Number, default: 0 },
    offerAmount: { type: Number, default: 0 },
    totalSpend: { type: Number, default: 0 },
    totalBuy: { type: Number, default: 0 },
    totalEarning: { type: Number, default: 0 },
    status: { type: Boolean, default: true }

}, {
        timestamps: true
    })
module.exports = mongoose.model("WalletUser", WalletUserScheme, "WalletUser")