const mongoose = require('mongoose')
// const bcrypt = require('bcrypt');

const schema = mongoose.Schema
const userNotificationScheme = schema({
    userId: { type: schema.Types.ObjectId, ref: 'user' },
    body: { type: String, default: '' },
    title: { type: String, default: '' },
    seen: { type: Boolean, default: true },
    status: { type: Boolean, default: true }

}, {
        timestamps: true
    })
module.exports = mongoose.model("userNotification", userNotificationScheme, "userNotification")