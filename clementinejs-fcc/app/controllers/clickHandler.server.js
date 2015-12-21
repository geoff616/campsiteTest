'use strict';

var Campsites = require('../models/campsites.js');  
var Users = require('../models/users.js');  
var moment = require('moment-timezone');      

function ClickHandler () {

	this.addCampsite = function (req, res) {

		var objToStore = req.body;
    objToStore['createdByDisplayName'] = req.user.github.displayName;
    objToStore['createdByUsername'] = req.user.github.username;
    objToStore['createdAtDisplay'] = moment().tz('America/New_York').format('MMMM Do YYYY, h:mm:ss a') 
    objToStore['createdAtTimestamp'] = moment().tz('America/New_York').format('x') //#eastcoastbias!
    objToStore['display'] = false;

		var newCampsite = new Campsites(objToStore);

    newCampsite.save(function (err, res) {
      if (err) return console.error(err);
      console.log(res);
    });
    res.end('great success')
	}
}
module.exports = ClickHandler;
