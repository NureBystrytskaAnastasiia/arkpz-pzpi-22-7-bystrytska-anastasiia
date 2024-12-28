const express = require('express');
const {
  addStorageRoom,
  getAllStorageRooms,
} = require('../controllers/locationController');

const router = express.Router();

/**
 * @swagger
 * /api/storage-rooms:
 *   get:
 *     summary: Отримання списку всіх кімнат
 *     tags:
 *       - Місце зберігання
 *     responses:
 *       200:
 *         description: Список кімнат успішно отримано
 *       404:
 *         description: Кімнати не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.get('/', getAllStorageRooms);

/**
 * @swagger
 * /api/storage-rooms/add:
 *   post:
 *     summary: Додавання нової кімнати
 *     tags:
 *       - Місце зберігання
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               sensorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Місце успішно додано
 *       400:
 *         description: Некоректні дані
 *       500:
 *         description: Помилка сервера
 */
router.post('/add', addStorageRoom);


module.exports = router;
