const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_details: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
