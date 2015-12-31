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
    objToStore['deleted'] = false;

		var newCampsite = new Campsites(objToStore);

    newCampsite.save(function (err, res) {
      if (err) return console.error(err);
      console.log(res);
    });
    res.end('great success')
	}

    this.editCampsite = function (req, res) {
        var id,fieldName,field,query,update,newValue, conditions,
        urlParts = req.path.split('/');
        id = urlParts[3];
        field = urlParts[4];
        if (field === "display" || field === "deletd" ) {
            //when client says 2, set to true
            if (req.body.value === '2') {
                newValue = true;
            } else {
                newValue = false;
            }
            //no prefix needed
            fieldName = field;

        } else {
            //all location fields being edited
            newValue = req.body.value;
            //add prefix
            fieldName = "location." + field;
        }
        
        query = {"location.googleID": id};
        update = {[fieldName]: newValue};

        Campsites.findOneAndUpdate(query, update,function (err, res){
            if (err) return console.error(err);
        });

      res.end('great success');
    };
}

module.exports = ClickHandler;
