const StorageRoom = require('../models/storageRoom.model');

// Додавання нової кімнати
exports.addStorageRoom = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ message: 'Поле "location" є обовʼязковим' });
    }

    const newRoom = new StorageRoom({ location });
    await newRoom.save();

    res.status(201).json({ message: 'Місце успішно додане', room: newRoom });
  } catch (error) {
    console.error('Помилка при додаванні кімнати:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

// Отримання всіх кімнат
exports.getAllStorageRooms = async (req, res) => {
  try {
    const rooms = await StorageRoom.find();

    if (rooms.length === 0) {
      return res.status(404).json({ message: 'Кімнати не знайдено' });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Помилка при отриманні кімнат:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};
