const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config()

const app = express();


// Your secret bot token.
const token = process.env.TELEGRAM_BOT_TOKEN;

// Создайте экземпляр бота
const bot = new TelegramBot(token, {webHook: true});

// URL вашего веб-мини-приложения
const webAppUrl = process.env.WEB_MINI_APP;


const webhookUrl = 'https://bot-host-on-vercel.vercel.app/';

bot.setWebHook(webhookUrl);

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

// Запустите бота
console.log('Бот запущен...');


app.get('/', (req, res) => {
    res.send('Express Bot on Vercel')
})
  
app.get('/ping', (req, res) => {
    res.send('pong 🏓')
})

console.log('test')

const port = 3000;

app.listen(port, () => {
    console.log(`[server]: Server is running`);
});
