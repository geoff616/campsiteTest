'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Campsite = new Schema({
  
  location: {
    city: String,
    country: String,
    subdivision: String,
    loc: { type: [Number], index: '2dsphere'}, //tell mongo loc is a geo point
    googleID: String,
    mapLink: String
  },
  url: String, //URL type?
  createdByDisplayName: String, 
  createdByUsername: String,
  createdAtDisplay : String, 
  createdAtTimestamp : Date,
  display: Boolean, //for moderator to set to visible
  deleted: Boolean
});

module.exports = mongoose.model('Campsite', Campsite);
