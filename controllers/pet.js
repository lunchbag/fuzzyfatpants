(function() {
  var Dog = require('../model/dog');

  module.exports.addNewDog = function (opts, cb) {
    var dog = new Dog(opts);
    dog.save(function (err) {
      console.log("wat")
      console.log(err);
      if (!err) {
        console.log('callback')
        cb(true);
      } else if (err.name === 'CastError') {
        // fails on first instance
        var error = {
          type: err.name
        }
        error[err.path] = {}
        error[err.path]['value'] = err.value
        error[err.path]['msg'] = "This value must be a valid date!"
        cb(false, error); // TODO return error message
      } else if (err.name === 'ValidationError') {
        var error = {
          type: err.name
        }
        for (var key in err.errors) {
          if (err.errors.hasOwnProperty(key)) {
            var obj = err.errors[key];
            for (var prop in obj) {
               if (obj.hasOwnProperty(prop)) {
                  error[key] = {}
                  error[key]['value'] = obj.value
                  error[key]['msg'] = "This value is required!"
               }
            }
          }
        }
        cb(false, error);
      }
    });
  }




}());