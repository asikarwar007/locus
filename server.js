// @ts-check
var util = require('./util');
const express = require('express');
const http = require('http');
const url = require('url');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const request = require('request');
var mongoose = require('mongoose');
const db = require('./config/db.config')
var path = require('path');
var fs = require('fs');
var admin = require("firebase-admin");

var serviceAccount = require("./config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatdemo-78ec1.firebaseio.com"
});

var loginRouter = require('./routes/login');
var userRouter = require('./routes/users');

var app = express();
app.use(bodyParser.json())
app.use(cookieParser())
app.all('/*', function (req, res, next) {
  // console.log(req.headers);
  // console.log(req.ip);
  // console.log(res.header);
  // console.log('Cookies: ', req.cookies)
  // console.log('Signed Cookies: ', req.signedCookies)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
});
mongoose.promise = global.promise;

mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log("db is connected")
})
  .catch(error => {
    console.log("db not connecred", error)
  })
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({
  extended: true
}))
const logRequestStart = (req, res, next) => {
  console.info(`${req.method} ${req.originalUrl} `, req.body)
  next()
}
app.use(logRequestStart)
app.get('/uploads/:image', (req, res) => {
  var image_name = req.params.image;
  var file = 'uploads/' + image_name
  fs.readFile(file, (err, data) => {
    if (err) {
      // res.download('uploads/9711048756.jpg')
    } else {
      // res.download(file)
      res.sendfile(file)
    }
  });
})

app.use('/auth', loginRouter);
app.use('/user', userRouter);

var port = process.env.PORT || 3090;

var server = app.listen(port, function () {
  console.log('Server running at ' + "hostaddress" + ":" + port + '/');
});
// async function main() {
//   // Azure App Service will set process.env.port for you, but we use 3000 in development.
//   const PORT = process.env.PORT || 3000;
//   // Create the express routes
//   let app = express();
//   app.use(express.static('public'));
//   app.use(cookieParser());

//   app.get('/', async (req, res) => {

//   });

//   app.get('/api/metadata', async (req, res) => {
//     if (req.cookies.loginsession) {
//       let tryappserviceendpoint= (process.env['APPSETTING_TRYAPPSERVICE_URL'] || 'https://tryappservice.azure.com') + '/api/vscoderesource';
//       const options = {
//         url: tryappserviceendpoint,
//         headers:{
//             cookie: 'loginsession='+req.cookies.loginsession
//         }
//       };

//   const x =request(options);
//   x.pipe(res);
// }
// else{
//   res.end(404);
// }
// });

// // Create the HTTP server.
//   let server = http.createServer(app);
//   server.listen(PORT, function () {
//     console.log(`Listening on port ${PORT}`);
//   });
// }

// main();
