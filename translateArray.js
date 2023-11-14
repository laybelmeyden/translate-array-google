const translate = require('translate-google');
const fs = require('fs').promises;

// Устанавливаем язык, с которого будем переводить
translate.from = 'ru';
translate.to = 'en';

// Пример JSON для перевода
const inputJsonPath = './errors.json';  // Укажите путь к вашему JSON-файлу с сообщениями
const outputJsonPath = './translated_messages.json';  // Укажите путь к файлу для сохранения переведенных сообщений

// Функция для перевода сообщений
async function translateMessages(messages) {
  const translatedMessages = [];

  for (const message of messages) {
    console.log(`Идет перевод для кода ${message.code}`);
    const translatedMessage = {
      code: message.code,
      message: await translate(message.message, { from: 'ru', to: 'en' })
    };

    translatedMessages.push(translatedMessage);
    console.log(`Перевод для кода ${message.code} завершен`);
  }

  return translatedMessages;
}

// Вызываем функцию для перевода сообщений
(async () => {
  try {
    console.log('Идет перевод...');
    const inputMessages = JSON.parse(await fs.readFile(inputJsonPath, 'utf-8'));
    const result = await translateMessages(inputMessages);

    // Сохраняем переведенные сообщения в файл
    await fs.writeFile(outputJsonPath, JSON.stringify(result, null, 2), 'utf-8');
    console.log(`Переведенные сообщения сохранены в файл: ${outputJsonPath}`);
  } catch (err) {
    console.error('Ошибка перевода:', err);
  }
})();
