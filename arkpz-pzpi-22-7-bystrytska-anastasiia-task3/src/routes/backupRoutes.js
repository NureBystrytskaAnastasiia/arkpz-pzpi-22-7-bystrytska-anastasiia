const express = require('express');
const router = express.Router();
const { backupDatabase } = require('../controllers/backupController'); // Імпортуємо функцію для резервного копіювання

// Маршрут для створення резервної копії бази даних
/**
 * @swagger
 * /api/backup/create-backup:
 *   post:
 *     summary: Створення резервної копії бази даних
 *     description: Створює резервну копію бази даних MongoDB за допомогою Node.js та бібліотеки mongodb.
 *     responses:
 *       200:
 *         description: Резервну копію успішно створено.
 *       500:
 *         description: Виникла помилка при створенні резервної копії.
 */
router.post('/create-backup', async (req, res) => {
  try {
    await backupDatabase(); // Викликаємо функцію для створення резервної копії
    res.status(200).json({ message: 'Резервну копію успішно створено.' });
  } catch (error) {
    console.error('Error during backup:', error);
    res.status(500).json({ message: 'Виникла помилка при створенні резервної копії.' });
  }
});

module.exports = router;
