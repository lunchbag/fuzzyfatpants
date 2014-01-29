(function() {
  var User = require('../model/user');
  
  module.exports.addNewUser = function(opts, cb) {
    var usr = new User(opts);
    usr.save(function(err) {
      if(err) {
        console.log(err);
        cb(false); // TODO return error message
      } else {
        console.log('user: ' + usr.username + " saved.");
        cb(true);
      }
    });
  }
}());