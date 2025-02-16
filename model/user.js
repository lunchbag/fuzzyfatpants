(function(){
  var mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , SALT_WORK_FACTOR = 10;

  var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    accessToken: { type: String }
  });

  userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  // Password verification
  userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    });
  };

  // Remember Me implementation helper method
  userSchema.methods.generateRandomToken = function () {
    var user = this
      , chars = "_!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
      , token = new Date().getTime() + '_';
    for ( var x = 0; x < 16; x++ ) {
      var i = Math.floor( Math.random() * 62 );
      token += chars.charAt( i );
    }
    return token;
  };

  var User = module.exports = mongoose.model('User', userSchema);
}());