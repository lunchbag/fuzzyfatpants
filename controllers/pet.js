(function() {
  var Dog = require('../model/dog');

  module.exports.addNewDog = function(opts, cb) {
    var dog = new Dog(opts);
    dog.save(function(err) {
      if(err) {
        console.log(err);
        cb(false); // TODO return error message
      } else {
        console.log('dog: ' + dog.name + " saved.");
        cb(true);
      }
    });
  }
}());