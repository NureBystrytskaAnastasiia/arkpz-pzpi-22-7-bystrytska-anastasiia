const express = require('express');
const checkRole = require('../middleware/checkRole');
const { getAllUsers, deleteUser,} = require('../controllers/adminController');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Отримати всіх користувачів
 *     tags:
 *       - Адміністрування
 *     responses:
 *       200:
 *         description: Успішно отримано список користувачів
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Помилка сервера
 */
router.get('/', checkRole(['admin']), getAllUsers);

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: Видалити користувача
 *     tags:
 *       - Адміністрування
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID користувача для видалення
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Користувача успішно видалено
 *       404:
 *         description: Користувача не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.delete('/:userId', checkRole(['admin']), deleteUser);


module.exports = router;
