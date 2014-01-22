var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  id: Number,
  email: String,
  plaintext_password: String,
  name: String
});

var User = module.exports = mongoose.model('User', userSchema);