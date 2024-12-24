const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Налаштування для Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Програмна система для автоматизації роботи аптечних мереж',
      version: '1.0.0',
      description: 'Документація API для програмної системи автоматизації роботи аптечних мереж',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerSetup: swaggerUi.setup(swaggerDocs),
  swaggerUi: swaggerUi,
};
