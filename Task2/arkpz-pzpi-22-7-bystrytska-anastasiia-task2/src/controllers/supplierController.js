const Supplier = require('../models/supplier.model');

// Додавання нового постачальника
exports.addSupplier = async (req, res) => {
  const { name, contact_details, address } = req.body;

  try {
    const newSupplier = new Supplier({
      name,
      contact_details,
      address,
    });

    await newSupplier.save();
    res.status(201).json({ message: 'Постачальник успішно доданий', supplier: newSupplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Редагування постачальника
exports.updateSupplier = async (req, res) => {
  const { supplier_id } = req.params;
  const { name, contact_details, address } = req.body;

  try {
    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) {
      return res.status(404).json({ message: 'Постачальника не знайдено' });
    }

    supplier.name = name || supplier.name;
    supplier.contact_details = contact_details || supplier.contact_details;
    supplier.address = address || supplier.address;

    await supplier.save();
    res.status(200).json({ message: 'Постачальник успішно оновлений', supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

// Видалення постачальника
exports.deleteSupplier = async (req, res) => {
  const { supplier_id } = req.params;

  try {
    // Знайти та видалити постачальника по ID
    const supplier = await Supplier.findByIdAndDelete(supplier_id);

    // Якщо постачальник не знайдений
    if (!supplier) {
      return res.status(404).json({ message: 'Постачальника не знайдено' });
    }

    res.status(200).json({ message: 'Постачальник успішно видалений' });
  } catch (error) {
    console.error("Error deleting supplier:", error);  // Логування помилки
    res.status(500).json({ message: 'Помилка сервера', error: error.message });
  }
};

  exports.getAllSuppliers = async (req, res) => {
    try {
      // Отримуємо всіх постачальників з бази
      const suppliers = await Supplier.find();
  
      // Якщо постачальників немає
      if (suppliers.length === 0) {
        return res.status(404).json({ message: 'Постачальники не знайдені' });
      }
  
      // Відправляємо список постачальників
      res.status(200).json(suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);  // Логування помилки
      res.status(500).json({ message: 'Помилка сервера', error: error.message });
    }
  };  