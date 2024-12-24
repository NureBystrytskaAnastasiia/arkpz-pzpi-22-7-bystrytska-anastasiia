const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  storage_room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StorageRoom',
    required: true,
  },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;
 