'use strict';

var express = require('express');
var session = require('express-session');
var exphbs  = require('express-handlebars');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');


var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);


mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});