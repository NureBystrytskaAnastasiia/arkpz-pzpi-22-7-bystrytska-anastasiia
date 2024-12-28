const Order = require('../models/order.model');
const Medicine = require('../models/medicine.model');

// Створення замовлення
exports.createOrder = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Ви повинні увійти в систему, щоб створити замовлення' });
  }

  try {
    const { medicine_id, total_cost, medicine_quantity } = req.body;
    const user_id = req.session.user.id;

    if (!medicine_quantity || medicine_quantity < 1) {
      return res.status(400).json({ message: 'Кількість ліків повинна бути більшою за 0' });
    }

    const newOrder = new Order({
      user_id,
      medicine_id,
      total_cost,
      medicine_quantity,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Замовлення успішно створено', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};


// Отримання всіх замовлень
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user_id medicine_id');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Отримання конкретного замовлення
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user_id medicine_id');
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Оновлення замовлення
exports.updateOrder = async (req, res) => {
  try {
    const { status } = req.body; 
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    // Якщо змінюємо статус на 'completed' і замовлення ще не виконано
    if (status === 'completed' && order.status !== 'completed') {
      const medicine = await Medicine.findById(order.medicine_id);

      if (!medicine) {
        return res.status(404).json({ message: 'Препарат не знайдено' });
      }

      // Оновлюємо кількість ліків на складі
      medicine.quantity += order.medicine_quantity;
      await medicine.save();
    }

    // Оновлюємо статус замовлення
    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.status(200).json({ message: 'Замовлення оновлено', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Видалення замовлення
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }
    res.status(200).json({ message: 'Замовлення видалено' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};
