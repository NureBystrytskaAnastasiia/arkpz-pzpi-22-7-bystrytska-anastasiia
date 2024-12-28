const StorageRoom = require('../models/storageRoom.model');
const IoTData = require('../models/IoTData.model'); // імпортуємо модель Sensor

// Додавання нової кімнати з датчиком
exports.addStorageRoom = async (req, res) => {
  try {
    const { location, sensorId } = req.body;

    if (!location || !sensorId) {
      return res.status(400).json({ message: 'Поле "location" та "sensorId" є обовʼязковими' });
    }

    // Перевіряємо, чи існує датчик
    const sensor = await IoTData.findById(sensorId);
    if (!sensor) {
      return res.status(404).json({ message: 'Датчик не знайдений' });
    }

    const newRoom = new StorageRoom({ location, sensorId });
    await newRoom.save();

    res.status(201).json({ message: 'Місце успішно додане', room: newRoom });
  } catch (error) {
    console.error('Помилка при додаванні кімнати:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

// Отримання всіх кімнат разом з даними про датчики
exports.getAllStorageRooms = async (req, res) => {
  try {
    const rooms = await StorageRoom.find().populate('sensorId'); // отримуємо дані про датчик разом з кімнатою

    if (rooms.length === 0) {
      return res.status(404).json({ message: 'Кімнати не знайдено' });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Помилка при отриманні кімнат:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};
