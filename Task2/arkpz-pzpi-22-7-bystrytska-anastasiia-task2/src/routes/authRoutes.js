const express = require('express');
const { registerUser, loginUser, logoutUser, forgotPassword } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags:
 *       - Аутентифікація
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Користувач успішно створений
 *       400:
 *         description: Користувач вже існує
 *       500:
 *         description: Помилка сервера
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вхід користувача
 *     tags:
 *       - Аутентифікація
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Вхід успішний
 *       401:
 *         description: Невірний email або пароль
 *       500:
 *         description: Помилка сервера
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Вихід користувача
 *     tags:
 *       - Аутентифікація
 *     responses:
 *       200:
 *         description: Вихід успішний
 *       500:
 *         description: Помилка під час виходу
 */
router.post('/logout', logoutUser);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Запит на відновлення паролю
 *     tags:
 *       - Аутентифікація
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Лист з новим паролем надіслано
 *       404:
 *         description: Користувача не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /api/auth/user-profile:
 *   get:
 *     summary: Отримати інформацію про поточного користувача
 *     tags:
 *       - Аутентифікація
 *     responses:
 *       200:
 *         description: Інформація про користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Користувач не авторизований
 *       500:
 *         description: Помилка сервера
 */
router.get('/user-profile', (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Користувач не авторизований' });
    }
  
    const { id, username, email, role } = req.session.user;
    res.json({ id, username, email, role });
  });

module.exports = router;
