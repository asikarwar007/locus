const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const schema = mongoose.Schema
const addUserScheme = schema({
    name: { type: String, default: '' },
    contact: { type: String, default: "0" },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    username: { type: String, default: '' },
    
    sex: { type: String, default: '' },
    bday: { type: String, default: '' },
    location: { type: String, default: '' },
    lat: { type: String, default: '' },
    lng: { type: String, default: '' },

    firebaseToken: { type: String, default: '' },
    bio: { type: String, default: '' },
    
    socialId: { type: String, default: '' },
    profileImg: { type: String, default: '' },
    
    ratings: { type: Number, default: 0 },
    runningService:{type:Boolean,default:false},
    reviewPending:{type:Boolean,default:false},
    
    isverifiedEmail: { type: Boolean, default: false },
    otpEmail: { type: String, default: '' },

    isverifiedMobile: { type: Boolean, default: false },
    otpMobile: { type: String, default: '' },
    
    lastLogin: { type: Date, default: '' },
    status: Boolean
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

module.exports = mongoose.model("users", addUserScheme, "users")