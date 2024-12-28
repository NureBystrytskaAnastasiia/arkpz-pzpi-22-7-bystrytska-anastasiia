const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const sessionConfig = require('./config/session');
const { swaggerDocs, swaggerSetup, swaggerUi } = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const storageRoomRoutes = require('./routes/locationRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const iotDataRoutes = require('./routes/iotDataRoutes');
const mqtt = require('mqtt');
const { saveTemperatureAndHumidity } = require('./controllers/iotDataController');
const backupRoutes = require('./routes/backupRoutes');

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type, Authorization'
}));

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
app.use('/api/iot', iotDataRoutes);
app.use('/api/backup', backupRoutes);

// Налаштування Swagger
app.use('/api-docs', swaggerUi.serve, swaggerSetup);

// Підключення до MQTT брокера
const mqttServer = 'mqtt://test.mosquitto.org';
const client = mqtt.connect(mqttServer);

client.on('connect', () => {
  console.log('MQTT connected');
  // Підписка на топік
  client.subscribe('TempData', (err) => {
    if (err) {
      console.log('Failed to subscribe:', err);
    }
  });
});

client.on('message', async (topic, message) => {
  if (topic === 'TempData') {
    const data = message.toString();
    const [temp, hum] = data.split(',').map(value => parseFloat(value));

    // Перевірка на коректність отриманих даних
    if (isNaN(temp) || isNaN(hum)) {
      console.log('Помилка в даних температури або вологості');
      return;
    }

    // Викликаємо контролер без використання res та req
    await saveTemperatureAndHumidity({ body: { temperature: temp, humidity: hum } }, { 
      status: (code) => ({
        json: (message) => console.log(code, message)
      })
    });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
  console.log(`Swagger доступний за адресою http://localhost:${PORT}/api-docs`);
});
