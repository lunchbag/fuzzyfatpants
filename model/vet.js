var mongoose = require('mongoose');

var vetSchema = new mongoose.Schema({
  id: Number,
  name: String,
  doctor: String,
  phone: String,
  email: String,
  fax: String
});

var Vet = module.exports = mongoose.model('Vet', vetSchema);