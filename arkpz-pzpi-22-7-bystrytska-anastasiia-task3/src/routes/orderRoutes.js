const express = require('express');
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Створення нового замовлення
 *     tags:
 *       - Замовлення
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medicine_id:
 *                 type: string
 *                 description: ID препарату
 *               total_cost:
 *                 type: number
 *                 description: Загальна вартість замовлення
 *               medicine_quantity:
 *                 type: number
 *                 description: Кількість замовленого препарату
 *                 example: 10
 *     responses:
 *       201:
 *         description: Замовлення успішно створено
 *       400:
 *         description: Некоректні дані у запиті
 *       401:
 *         description: Користувач не авторизований
 *       500:
 *         description: Помилка сервера
 */
router.post('/', createOrder);


/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Отримання всіх замовлень
 *     tags:
 *       - Замовлення
 *     responses:
 *       200:
 *         description: Список замовлень успішно отримано
 *       500:
 *         description: Помилка сервера
 */
router.get('/', getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Отримання конкретного замовлення
 *     tags:
 *       - Замовлення
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID замовлення
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Замовлення успішно отримано
 *       404:
 *         description: Замовлення не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.get('/:id', getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Оновлення замовлення
 *     tags:
 *       - Замовлення
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID замовлення
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['pending', 'completed', 'cancelled']
 *                 description: Новий статус замовлення
 *               total_cost:
 *                 type: number
 *                 description: Загальна вартість замовлення (за потреби)
 *               medicine_quantity:
 *                 type: number
 *                 description: Оновлена кількість замовленого препарату (за потреби)
 *                 example: 5
 *     responses:
 *       200:
 *         description: Замовлення успішно оновлено
 *       404:
 *         description: Замовлення не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.put('/:id', updateOrder);


/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Видалення замовлення
 *     tags:
 *       - Замовлення
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID замовлення
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Замовлення успішно видалено
 *       404:
 *         description: Замовлення не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.delete('/:id', deleteOrder);

module.exports = router;
