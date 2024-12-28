const mongoose = require('mongoose');

const IoTDataSchema = new mongoose.Schema({
  recorded_temperature: {
    type: Number,
    required: true,
  },
  recorded_humidity: {
    type: Number,
    required: true,
  },
  recorded_at: {
    type: Date,
    default: Date.now,
  },
});

const IoTData = mongoose.model('IoTData', IoTDataSchema);

module.exports = IoTData;
