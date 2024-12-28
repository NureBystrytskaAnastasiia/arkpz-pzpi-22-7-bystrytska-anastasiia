// utils/temperatureHumidityProcessor.js

/**
 * Функція для обробки температури і вологості.
 * Тут можна реалізувати будь-яку логіку обробки даних.
 * Наприклад, класифікація значень або обчислення середнього.
 */

// Простий приклад обробки температури та вологості
function processTemperatureAndHumidity(temperature, humidity) {
  // Тут може бути ваша логіка для обробки даних
  let temperatureCategory;
  let humidityCategory;

  // Класифікація температури
  if (temperature < 15) {
    temperatureCategory = 'low';
  } else if (temperature >= 15 && temperature <= 25) {
    temperatureCategory = 'normal';
  } else {
    temperatureCategory = 'high';
  }

  // Класифікація вологості
  if (humidity < 30) {
    humidityCategory = 'low';
  } else if (humidity >= 30 && humidity <= 60) {
    humidityCategory = 'normal';
  } else {
    humidityCategory = 'high';
  }

  // Повертаємо оброблені значення
  return {
    processed_temperature: temperature,
    temperature_category: temperatureCategory,
    processed_humidity: humidity,
    humidity_category: humidityCategory
  };
}

module.exports = { processTemperatureAndHumidity };
