'use strict';

var Campsites = require('../models/campsites.js');  
var Users = require('../models/users.js');  
var moment = require('moment-timezone');      

function QueryMongo () {

  this.findCampsites = function (req, res) {

    var location = req.body.location


    res.end('great success')
  }
}
module.exports = QueryMongo;