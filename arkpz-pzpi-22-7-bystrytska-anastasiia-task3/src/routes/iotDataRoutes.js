const express = require('express');
const router = express.Router();
const { saveTemperatureAndHumidity, getTemperatureAndHumidity } = require('../controllers/iotDataController');

/**
 * @swagger
 * /api/iot/temperature-humidity:
 *   get:
 *     summary: Отримати температуру та вологість через MQTT
 *     description: Отримує температуру та вологість з MQTT топіка і повертає їх у JSON-форматі.
 *     responses:
 *       200:
 *         description: Успішний запит
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Дані отримано успішно"
 *             data:
 *               type: object
 *               properties:
 *                 temperature:
 *                   type: number
 *                   example: 22.5
 *                 humidity:
 *                   type: number
 *                   example: 65
 *       404:
 *         description: Дані не знайдено
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Дані не знайдені"
 *       500:
 *         description: Помилка на сервері
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Помилка на сервері"
 */
router.get('/temperature-humidity', getTemperatureAndHumidity);


router.post('/process-data', saveTemperatureAndHumidity);

module.exports = router;
