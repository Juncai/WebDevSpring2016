var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var passport = require('passport');
var app = express();

// create a default connection string
var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

// use remote connection string
// if running in remote server
if (process.env.OPENSHIFT_MONGODB_DB_HOST) {
    connectionString = 'mongodb://' +
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        'webdev2016';
}

// connect to the database
var db = mongoose.connect(connectionString);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
multer();
app.use(session({
    //secret: 'this is the secret',
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
//require("./app/app.js")(app);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);