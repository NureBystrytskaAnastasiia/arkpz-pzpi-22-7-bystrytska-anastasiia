const User = require('../models/user.model');

// Функція для отримання всіх користувачів
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при отриманні користувачів', error });
  }
};

// Функція для видалення користувача
exports.deleteUser = async (req, res) => {
  const { userId } = req.params; 

  try {
    const user = await User.findByIdAndDelete(userId); 
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.status(200).json({ message: 'Користувача успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера при видаленні користувача', error });
  }
};

// Оновлення даних користувача (фокус на оновленні ролі)
exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const updatedData = req.body; 
  
    console.log("Received userId:", userId);
    console.log("Received data:", updatedData);
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено' });
      }
  
      if (req.session.user.role !== 'admin') {
        return res.status(403).json({ message: 'У вас немає прав для зміни даних користувача' });
      }
  
      // Оновлюємо лише ті поля, які були передані
      Object.keys(updatedData).forEach((key) => {
        user[key] = updatedData[key];
      });
  
      await user.save();
  
      res.status(200).json({ message: 'Дані користувача оновлено', user });
    } catch (error) {
      res.status(500).json({ message: 'Помилка сервера під час оновлення користувача', error: error.message });
    }
  };
  
  