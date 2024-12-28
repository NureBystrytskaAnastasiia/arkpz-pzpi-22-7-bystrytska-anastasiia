const session = require('express-session');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');

// Створюємо секретний ключ
const secretKey = 'c4509a375eb5733f9dc1ccdc0d4f69a4f625f86eaff304b7c93038406f1ce456';

const sessionConfig = (app) => {
  app.use(
    session({
      secret: secretKey,  
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://anasteiha484:stasia14t@cluster0.rxxef.mongodb.net/?retryWrites=true&w=majority',  // Ваш Mongo URI
        collectionName: 'sessions',
      }),
      cookie: {
        httpOnly: true,
        secure: false, 
        maxAge: 60 * 60 * 1000, 
      },
    })
  );
};

module.exports = sessionConfig;
