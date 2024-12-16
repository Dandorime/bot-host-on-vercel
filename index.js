const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

// Замените на ваш токен, который вы получили от BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token);

// URL вашего веб-мини-приложения
const webAppUrl = process.env.WEB_MINI_APP;

// Устанавливаем вебхук
bot.setWebHook(`https://bot-host-on-vercel.vercel.app/`); // Замените на URL вашего развертывания на Vercel

// Middleware для обработки JSON
app.use(bodyParser.json());

// Обработка входящих обновлений от Telegram
app.post(`/`, (req, res) => {
    const msg = req.body;

    // Обрабатываем команду /start
    if (msg.message && msg.message.text === '/start') {
        const chatId = msg.message.chat.id;

        // Отправка сообщения с кнопкой для открытия веб-мини-приложения
        const replyMarkup = {
            inline_keyboard: [
                [
                    {
                        text: 'Открыть мини-приложение',
                        web_app: { url: webAppUrl }, // Используем web_app для открытия мини-приложения
                    },
                ],
            ],
        };

        bot.sendMessage(chatId, 'Привет! Нажмите кнопку ниже, чтобы открыть веб-мини-приложение.', {
            reply_markup: replyMarkup,
        });
    } else if(msg.message && msg.message.text !== '/start') {
        const chatId = msg.message.chat.id;
        bot.sendMessage(chatId, 'Я не понимаю. Напишите /start для запуска.');
    }

    // Отправляем ответ Telegram, чтобы подтвердить получение обновления
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.sendStatus(200);
})

// Запускаем сервер
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

