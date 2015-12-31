'use strict';

var Campsites = require('../models/campsites.js');  
var Users = require('../models/users.js');  
var moment = require('moment-timezone');      

function QueryMongo () {

  this.findCampsites = function (req, res) {

    var loc = req.body
    var coords = [loc.lng, loc.lat]

     Campsites.find({
      display: true,
      deleted: false
    }).exec(function(err, campsites) {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(campsites);
    });

  }

  this.pendingCampsites = function (req, res) {

    Campsites.find({
      display: false,
      deleted: false
  }).exec(function(err, campsites) {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(campsites);
    });
  }
}
module.exports = QueryMongo;