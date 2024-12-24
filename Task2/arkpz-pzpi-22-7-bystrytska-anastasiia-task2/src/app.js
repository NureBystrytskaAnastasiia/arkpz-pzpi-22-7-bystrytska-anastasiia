const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const sessionConfig = require('./config/session');  // Окремий файл для конфігурації сесій
const { swaggerDocs, swaggerSetup, swaggerUi } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const storageRoomRoutes = require('./routes/locationRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors({ origin: '*' }));

// Middleware для парсингу JSON
app.use(express.json()); 

// Підключення до MongoDB
connectDB(app);

// Налаштування сесії
sessionConfig(app);

// Підключення маршрутів
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/storage-rooms', storageRoomRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', adminRoutes);

// Налаштування Swagger
app.use('/api-docs', swaggerUi.serve, swaggerSetup);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
  console.log(`Swagger доступний за адресою http://localhost:${PORT}/api-docs`);
});
