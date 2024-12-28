const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Підключення до MongoDB
const uri = 'mongodb+srv://anasteiha484:stasia14t@cluster0.rxxef.mongodb.net/?retryWrites=true&w=majority'; 
const dbName = 'test';

async function backupDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to database');

    const db = client.db(dbName); 
    
    const collections = await db.collections(); // Отримуємо всі колекції

    // Створюємо директорію для збереження резервних копій
    const backupDir = path.join(__dirname, 'backups', dbName);
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Проходимо по всіх колекціях і експортуємо їх у JSON
    for (let collection of collections) {
      console.log(`Backing up collection: ${collection.collectionName}`);

      const data = await collection.find().toArray(); // Отримуємо всі документи з колекції
      const filePath = path.join(backupDir, `${collection.collectionName}.json`);

      // Записуємо дані у JSON файл
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Collection ${collection.collectionName} backed up successfully`);
    }

    console.log('Database backup completed successfully!');
  } catch (error) {
    console.error('Error during backup:', error);
  } finally {
    await client.close(); // Закриваємо з'єднання з базою даних
  }
}

backupDatabase();
