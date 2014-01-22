(function() {
  var mongoose = require('mongoose'),
      User = mongoose.model('User'),
      Dog = mongoose.model('Dog'),
      Vet = mongoose.model('Vet'),
      _ = require('underscore'),
      moment = require('moment');

  var user = require('./user');
  
  // PUBLIC


  // Check if a certain amount of time has passed since events have ended
  // UNTESTED
  module.exports.setExpiredEvents = function() {
    
  };

}());

