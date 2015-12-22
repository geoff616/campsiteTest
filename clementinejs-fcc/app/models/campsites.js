'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Campsite = new Schema({
  //id: String, //primary key - NOTE: I think this will be there by default
  location: {
    city: String,
    country: String,
    subdivision: String,
    loc: { type: [Number], index: '2dsphere'}, //tell mongo loc is a geo point
    googleID: String
  },
  url: String, //URL type?
  createdByDisplayName: String, 
  createdByUsername: String,
  createdAtDisplay : String, 
  createdAtTimestamp : Date,
  display: Boolean //for moderator
});

module.exports = mongoose.model('Campsite', Campsite);
