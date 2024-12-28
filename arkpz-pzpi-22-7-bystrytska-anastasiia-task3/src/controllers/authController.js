const User = require('../models/user.model');
const nodemailer = require('nodemailer');


const getUserProfile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Користувач не авторизований' });
  }
  
  const { id, username, email, role } = req.session.user;
  res.json({ id, username, email, role });
};

// Реєстрація користувача
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Перевірка чи користувач із таким email уже існує
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач із таким email вже існує' });
    }

    // Створення нового користувача
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    // Відповідь успішної реєстрації
    res.status(201).json({
      message: 'Реєстрація успішна',
      user: { id: newUser._id, username: newUser.username, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    // Перевірка на помилку з унікальністю email
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Користувач із таким email вже існує' });
    }
    res.status(500).json({ message: 'Помилка сервера під час реєстрації', error: error.message });
  }
};


// Вхід користувача
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Перевірка чи користувач існує
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }

    // Перевірка пароля
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Невірний email або пароль' });
    }

    // Збереження сесії
    req.session.user = { id: user._id, username: user.username, role: user.role };
    res.json({
      message: 'Вхід успішний',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера під час входу', error: error.message });
  }
};

// Вихід користувача
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Помилка під час виходу', error: err.message });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Вихід успішний' });
  });
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  try {
    // Перевіряємо, чи є користувач з такою поштою
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'Користувача з такою електронною поштою не знайдено' });
    }

    // Генеруємо новий пароль
    const newPassword = Math.random().toString(36).slice(-8);  // Генерація випадкового паролю (можна змінити на іншу логіку)

    // Оновлюємо пароль користувача
    user.password = newPassword;  
    await user.save();

    // Створюємо транспортер для відправки email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anastasiia.bystrytska@nure.ua',
        pass: '2CkTYh6e' 
      }
    });

    // Тема та текст листа
    const mailOptions = {
      from: 'anastasiia.bystrytska@nure.ua',
      to: email,
      subject: 'Відновлення паролю',
      text: `Ваш новий пароль: ${newPassword}. Використовуйте цей пароль для входу в систему.`
    };

    // Надсилаємо лист
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Mail sending error: ', err); 
        return res.status(500).json({ message: 'Помилка при відправці листа', error: err });
      }
      return res.status(200).json({ message: 'Новий пароль надіслано на вашу електронну пошту' });
    });
    
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
};



module.exports = { getUserProfile, registerUser, loginUser, logoutUser, forgotPassword };
