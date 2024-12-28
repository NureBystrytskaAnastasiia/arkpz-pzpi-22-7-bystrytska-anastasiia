const mongoose = require('mongoose');

const storageRoomSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  sensorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'IoTData', // посилання на модель Sensor (датчик)
    required: true,
  },
});

const StorageRoom = mongoose.model('StorageRoom', storageRoomSchema);

module.exports = StorageRoom;
