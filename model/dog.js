var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  owner_id: { type: String, required: true },
  name: { type: String, required: true },
  breed_id: { type: String, required: true },
  birthday: { type: Date, required: true },
  gender: { type: String, required: true },
  vet_id: { type: Number, required: true },
  spay_neuter: { type: Boolean, required: true },
  color: { type: String, required: true },
  weight: { type: Number, required: true },
  microchip_id: { type: Number, required: true }
});

var Dog = module.exports = mongoose.model('Dog', dogSchema);