const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Клієнт підключився');
  
  ws.on('message', (message) => {
    console.log('Отримано повідомлення від клієнта:', message);
  });

  // Відправляємо повідомлення кожні 10 секунд
  setInterval(() => {
    ws.send('Привіт від сервера');
  }, 10000);
});

server.listen(5000, () => {
  console.log('Сервер працює на порту 5000');
});
