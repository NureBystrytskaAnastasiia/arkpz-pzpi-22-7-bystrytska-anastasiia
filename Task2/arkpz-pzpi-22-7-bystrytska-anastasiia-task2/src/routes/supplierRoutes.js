const express = require('express');
const { addSupplier, updateSupplier, deleteSupplier, getAllSuppliers } = require('../controllers/supplierController');
const router = express.Router();

/**
 * @swagger
 * /api/suppliers/add:
 *   post:
 *     summary: Додавання нового постачальника
 *     tags:
 *       - Постачальники
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact_details:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Постачальник успішно доданий
 *       400:
 *         description: Некоректні дані
 *       500:
 *         description: Помилка сервера
 */
router.post('/add', addSupplier);

/**
 * @swagger
 * /api/suppliers/update/{supplier_id}:
 *   put:
 *     summary: Редагування постачальника
 *     tags:
 *       - Постачальники
 *     parameters:
 *       - name: supplier_id
 *         in: path
 *         required: true
 *         description: ID постачальника для редагування
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
 *               contact_details:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Постачальник успішно оновлений
 *       400:
 *         description: Некоректні дані
 *       404:
 *         description: Постачальника не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.put('/update/:supplier_id', updateSupplier);

/**
 * @swagger
 * /api/suppliers/delete/{supplier_id}:
 *   delete:
 *     summary: Видалення постачальника
 *     tags:
 *       - Постачальники
 *     parameters:
 *       - name: supplier_id
 *         in: path
 *         required: true
 *         description: ID постачальника для видалення
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Постачальник успішно видалений
 *       404:
 *         description: Постачальника не знайдено
 *       500:
 *         description: Помилка сервера
 */
router.delete('/delete/:supplier_id', deleteSupplier);
/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Отримати всіх постачальників
 *     tags:
 *       - Постачальники
 *     responses:
 *       200:
 *         description: Список постачальників
 *       404:
 *         description: Постачальники не знайдені
 *       500:
 *         description: Помилка сервера
 */
router.get('/', getAllSuppliers);
module.exports = router;
