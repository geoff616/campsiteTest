'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var QueryMongo = require(path + '/app/controllers/queryMongo.server.js');

module.exports = function (app, passport) {

	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var queryMongo = new QueryMongo();

	app.route('/')
		.get(function (req, res) {
			//isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});

	app.route('/addCampsite')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/addCampsite.html');
		});

	//route to determine if login or logout button should be shown on homepage
	//This could be done a number of different ways...
	app.route('/api/isLoggedIn')
		.get(function (req, res) {
			var isLoggedIn = false;
			if (req.isAuthenticated()) {
				isLoggedIn = true;
			} 
			res.end(isLoggedIn.toString());
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/pendingCampsites')
		.get(isLoggedIn,queryMongo.pendingCampsites)

	app.route('/api/addCampsite')
		.post(isLoggedIn, clickHandler.addCampsite);

	app.route('/api/queryCampsites')
		.post(queryMongo.findCampsites);

	app.route('/api/editCampsite/*')
		.post(isLoggedIn, clickHandler.editCampsite);
};
