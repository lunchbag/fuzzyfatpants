var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
  id: Number,
  owner_id: Number,
  name: String,
  breed_id: Array,
  birthday: Date,
  gender: String,
  vet_id: Number,
  spay_neuter: Boolean,
  color: String,
  weight: Number,
  microchip_id: Number
});

var Dog = module.exports = mongoose.model('Dog', dogSchema);