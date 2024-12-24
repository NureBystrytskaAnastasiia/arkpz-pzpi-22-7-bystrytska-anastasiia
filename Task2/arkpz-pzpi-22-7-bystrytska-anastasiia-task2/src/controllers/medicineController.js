const Medicine = require('../models/medicine.model');
const checkRole = require('../middleware/checkRole');

// Додавання нового лікарського засобу
exports.addMedicine = async (req, res) => {
  try {
    const { name, manufacturer, expiration_date, quantity, supplier_id, storage_room_id } = req.body;

    if (!name || !manufacturer || !expiration_date || quantity == null || !supplier_id || !storage_room_id) {
      return res.status(400).json({ message: 'Усі поля є обовʼязковими' });
    }

    const newMedicine = new Medicine({
      name,
      manufacturer,
      expiration_date,
      quantity,
      supplier_id,
      storage_room_id,
    });

    await newMedicine.save();
    res.status(201).json({ message: 'Лікарський засіб успішно додано', medicine: newMedicine });
  } catch (error) {
    console.error('Помилка при додаванні лікарського засобу:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

// Редагування лікарського засобу
exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedMedicine = await Medicine.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedMedicine) {
      return res.status(404).json({ message: 'Лікарський засіб не знайдено' });
    }

    res.status(200).json({ message: 'Лікарський засіб успішно оновлено', medicine: updatedMedicine });
  } catch (error) {
    console.error('Помилка при редагуванні лікарського засобу:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

// Видалення лікарського засобу
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMedicine = await Medicine.findByIdAndDelete(id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: 'Лікарський засіб не знайдено' });
    }

    res.status(200).json({ message: 'Лікарський засіб успішно видалено' });
  } catch (error) {
    console.error('Помилка при видаленні лікарського засобу:', error);
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};
// Отримання всіх ліків
exports.getAllMedicines = async (req, res) => {
    try {
      const medicines = await Medicine.find()
        .populate('supplier_id', 'name contact_details') // Підтягуємо інформацію про постачальника
        .populate('storage_room_id', 'location'); // Підтягуємо інформацію про кімнату зберігання
  
      if (medicines.length === 0) {
        return res.status(404).json({ message: 'Ліки не знайдено' });
      }
  
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Помилка при отриманні всіх ліків:', error);
      res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
  };
  
  exports.getMedicineById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Шукаємо лікарський засіб за ID в базі даних
      const medicine = await Medicine.findById(id)
        .populate('supplier_id', 'name contact_details')  // Підтягуємо інформацію про постачальника
        .populate('storage_room_id', 'location');  // Підтягуємо інформацію про кімнату зберігання
  
      if (!medicine) {
        return res.status(404).json({ message: 'Ліки не знайдено' });
      }
  
      res.status(200).json(medicine);
    } catch (error) {
      console.error('Помилка при отриманні ліків за ID:', error);
      res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
  };
  