const express = require('express');
const checkRole = require('../middleware/checkRole');
const { getAllUsers, deleteUser,updateUser } = require('../controllers/adminController');
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
/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: Оновлення даних користувача
 *     tags:
 *       - Адміністрування
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID користувача для оновлення
 *         schema:
 *           type: string
 *       - in: body
 *         name: user
 *         required: true
 *         description: Дані для оновлення користувача
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *               
 *     responses:
 *       200:
 *         description: Дані користувача оновлено
 *       400:
 *         description: Невірні дані
 *       403:
 *         description: Немає прав для оновлення користувача
 *       404:
 *         description: Користувача не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.put('/:userId', checkRole(['admin']), updateUser);


module.exports = router;
