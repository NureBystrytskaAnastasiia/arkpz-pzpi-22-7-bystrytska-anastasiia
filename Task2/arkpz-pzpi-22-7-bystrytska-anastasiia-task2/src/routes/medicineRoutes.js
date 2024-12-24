const express = require('express');
const { addMedicine, updateMedicine, deleteMedicine, getAllMedicines, getMedicineById } = require('../controllers/medicineController');
const router = express.Router();

/**
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Додавання нового лікарського засобу
 *     tags:
 *       - Ліки
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               quantity:
 *                 type: number
 *               supplier_id:
 *                 type: string
 *               storage_room_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Лікарський засіб успішно додано
 *       400:
 *         description: Некоректні дані
 *       500:
 *         description: Помилка сервера
 */
router.post('/', addMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   put:
 *     summary: Редагування лікарського засобу
 *     tags:
 *       - Ліки
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *                 format: date
 *               quantity:
 *                 type: number
 *               supplier_id:
 *                 type: string
 *               storage_room_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Лікарський засіб успішно оновлено
 *       404:
 *         description: Лікарський засіб не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.put('/:id', updateMedicine);

/**
 * @swagger
 * /api/medicines/{id}:
 *   delete:
 *     summary: Видалення лікарського засобу
 *     tags:
 *       - Ліки
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Лікарський засіб успішно видалено
 *       404:
 *         description: Лікарський засіб не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.delete('/:id', deleteMedicine);
/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Отримання списку всіх ліків
 *     tags:
 *       - Ліки
 *     responses:
 *       200:
 *         description: Список ліків успішно отримано
 *       404:
 *         description: Ліки не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.get('/', getAllMedicines);

/**
 * @swagger
 * /api/medicines/{id}:
 *   get:
 *     summary: Отримання конкретного лікарського засобу
 *     tags:
 *       - Ліки
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID лікарського засобу
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Лікарський засіб успішно отримано
 *       404:
 *         description: Ліки не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.get('/:id', getMedicineById);


module.exports = router;
