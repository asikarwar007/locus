const mongoose = require('mongoose')
// const bcrypt = require('bcrypt');

const schema = mongoose.Schema
const addUserScheme = schema({
    userId: { type: schema.Types.ObjectId, ref: 'users' },
    houseNo: { type: String, default: '' },
    street: { type: String, default: '' },
    landmark: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    pincode: { type: String, default: 000000 },
    lat: { type: String, default: '' },
    lng: { type: String, default: '' },

    name: { type: String, default: ''},
    email: { type: String, default: '' },
    mobile: { type: String, default: '' },

    timing: { type: String, default: '' },

    type: { type: String, default: '' },

    status: { type: Boolean, default: true }
}, {
    timestamps: true
})

// addUserScheme.methods.hasSamePassword = function(requestedPassword) {

//     return bcrypt.compareSync(requestedPassword, this.password);
// }


// addUserScheme.pre('save', function(next) {
//     const user = this;

//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             user.password = hash;
//             next();
//         });
//     });
// });

module.exports = mongoose.model("userAddress", addUserScheme, "userAddress")