var mongoose = require('mongoose');

var dogSchema = new mongoose.Schema({
  id: { type: Number },
  owner_id: { type: String, required: true },
  name: { type: String, required: true },
  breed_id: { type: String, required: true },
  birthday: { type: String, required: true },
  gender: { type: String, required: true },
  vet_id: { type: String, required: true },
  spay_neuter: { type: String, required: true },
  color: { type: String, required: true },
  weight: { type: String, required: true },
  microchip_id: { type: String, required: true }
});

var Dog = module.exports = mongoose.model('Dog', dogSchema);