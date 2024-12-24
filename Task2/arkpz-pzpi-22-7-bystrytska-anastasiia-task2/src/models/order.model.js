const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'], 
    default: 'pending',
  },
  total_cost: {
    type: Number,
    required: true,
  },
  medicine_quantity: {
    type: Number,
    required: true, 
    min: 1, // Замовлення має містити хоча б 1 одиницю
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  medicine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
