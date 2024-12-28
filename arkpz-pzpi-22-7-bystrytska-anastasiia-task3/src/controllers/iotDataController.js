// controllers/iotDataController.js
const IoTData = require('../models/IoTData.model');

// Контролер для обробки та збереження даних температури і вологості
exports.saveTemperatureAndHumidity = async (req, res) => {
  try {
    // Генерація випадкових значень для температури та вологості в межах
    const randomTemperature = (Math.random() * (25 - 15) + 15).toFixed(2); // Від 15 до 25 градусів
    const randomHumidity = (Math.random() * (70 - 30) + 30).toFixed(2); // Від 30% до 70%

    // Математична обробка даних
    const processedTemperature = randomTemperature * 1.1 + 5;
    const processedHumidity = randomHumidity * 0.9 + 3;

    const newData = new IoTData({
      recorded_temperature: processedTemperature,
      recorded_humidity: processedHumidity,
    });

    await newData.save();

    res.status(201).json({
      message: 'Дані успішно оброблено та збережено',
      data: { processedTemperature, processedHumidity },
    });
  } catch (error) {
    console.error('Помилка при обробці та збереженні даних:', error);
    res.status(500).json({ message: 'Помилка на сервері', error: error.message });
  }
};



// Контролер для отримання даних температури і вологості
exports.getTemperatureAndHumidity = async (req, res) => {
  try {
    const latestData = await IoTData.findOne().sort({ _id: -1 }); // Отримуємо останній запис

    if (!latestData) {
      return res.status(404).json({ message: 'Дані не знайдені' });
    }

    res.status(200).json({
      message: 'Дані отримано успішно',
      data: {
        temperature: latestData.recorded_temperature,
        humidity: latestData.recorded_humidity,
      },
    });
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    res.status(500).json({ message: 'Помилка на сервері', error: error.message });
  }
};