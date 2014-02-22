var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
  id: Number,
  owner_id: String,
  name: String,
  breed_id: String,
  birthday: String,
  gender: String,
  vet_id: String,
  spay_neuter: String,
  color: String,
  weight: String,
  microchip_id: String
});

var Dog = module.exports = mongoose.model('Dog', dogSchema);