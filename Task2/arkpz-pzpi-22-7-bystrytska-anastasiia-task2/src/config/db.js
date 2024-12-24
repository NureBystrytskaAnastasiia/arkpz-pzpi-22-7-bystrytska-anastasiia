const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://anasteiha484:stasia14t@cluster0.rxxef.mongodb.net/?retryWrites=true&w=majority'; // Ваш URI підключення до MongoDB
    console.log("Починається підключення до MongoDB...");

    // Підключення до MongoDB
    await mongoose.connect(uri);
    console.log("MongoDB підключено");
  } catch (err) {
    console.error("Помилка підключення до MongoDB:", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
