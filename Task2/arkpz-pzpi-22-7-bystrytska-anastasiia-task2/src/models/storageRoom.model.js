const mongoose = require('mongoose');

const storageRoomSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
});

const StorageRoom = mongoose.model('StorageRoom', storageRoomSchema);

module.exports = StorageRoom;
