import TelegramBot from 'node-telegram-bot-api'
import express from 'express'

// Your secret bot token.
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создайте экземпляр бота
const bot = new TelegramBot(token);

// URL вашего веб-мини-приложения
const webAppUrl = process.env.WEB_MINI_APP;

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Отправьте пользователю сообщение с кнопкой для открытия веб-приложения
    bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть веб-мини-приложение.', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Открыть мини-приложение',
                        web_app: {url: webAppUrl}, // Ссылка на ваше веб-мини-приложение
                    },
                ],
            ],
        },
    });
});

// Обработчик для других текстовых сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text !== '/start')
        bot.sendMessage(chatId, 'Я не понимаю. Напишите /start для запуска.');
});

const app = express();


app.get('/', (req, res) => {
    res.send('Express BOT on Vercel')
})

const webhookUrl = 'https://YOUR_VERCEL_DEPLOYED_URL/';
bot.setWebHook(webhookUrl);

// Запустите бота
console.log('Бот запущен...');

app.listen(port, () => {
    console.log(`[server]: Server is running`);
  });
