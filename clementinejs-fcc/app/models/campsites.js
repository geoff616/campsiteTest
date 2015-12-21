'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//id  ObjectId  Unique Campsite ID
//city  string  City Name
//country string  Country Name - Populate from Dropdown
//subdivision string  State/Province, etc
//coordinates object  Lat/Long object
//google_id string  unique google id for map element
//url string  Social Media URL (IE: Facebook Link)
//createdBy ObjectId  FCC User who created the record
//createdOn date  Campsite Record Creation date
//display boolean Display/Don't Display (for Moderation)

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
  createdBy: String, //Object ID
  createdOn: Date,
  display: Boolean //for moderator
});

module.exports = mongoose.model('Campsite', Campsite);
