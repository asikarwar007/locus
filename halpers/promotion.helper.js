var admin = require("firebase-admin");
var config = require("../config/common.config");
const axios = require('axios');
var Request = require('request');


module.exports = {
    sendPush: async (registrationTokens, title, body,calback)=>{
        var payload = {
            notification: {
                title: title,
                body: body
            },
            data: {
                title: title,
                body: body
            }
        };
        admin.messaging().sendToDevice(registrationTokens, payload)
            .then(function (response) {
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log('Successfully sent message:', response);
                return calback(null,true)
            })
            .catch(function (error) {
                console.log('Error sending message:', error);
                return calback(null, false)
            });
    },
    sendSMS:async (number,text,calback)=>{
        var url = "https://app.rpsms.in/api/push.json?apikey=" + config.RP_API_Key + "&sender=" + config.RP_SENDER_ID + "&mobileno=" + number + "&text=" + text;
        var options = {
            uri: url,
            method: 'POST',
            json: true,
            headers: {
                "Content-Type": "application/json"
            },
            strictSSL: false

        };
        Request.post(options, function (err, response, body) {
            console.log(response.body)
            if (response.statusCode == 200) {
               calback(null,true)

            }
            else {
                calback(null, false)
            }
        })
            
    },
    uploadImage: async (req, res) => {
        let fileDestination = path.resolve(__dirname, '../uploads/thumb');
        let originalfileDestination = path.resolve(__dirname, '../uploads');
        let saveToOriginal = path.join(originalfileDestination, req.file.filename);
        let saveTo = path.join(fileDestination, "thumb_" + req.file.filename);
        // let AllData = await AdminModel.find({status:true})
        if (req.file) {
            sharp(req.file.path)
                .rotate()

                .toBuffer()
                .then(data => {
                    // console.log(data)
                    sharp(data)
                        .resize(640)
                        .toFile(saveToOriginal, (err, info) => {
                            // console.log(info)
                            sharp(data)
                                .resize(300)
                                .toFile(saveTo, (err, info) => {
                                    // console.log("thumb", info)
                                    req.file.path = config.baseUrl + req.file.path
                                    return res.send({
                                        error: false,
                                        message: "upload success",
                                        imageinfo: req.file
                                    })
                                });

                        });

                })



        } else {
            res.send({
                error: true,
                message: "no image"
            })
        }
    }
}