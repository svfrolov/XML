const express = require('express');
const path = require('path');
const cors = require('cors');
// Импортируем экземпляр контроллера, а не класс
const stocksController = require('./internal/stocks/StocksController');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static(path.join(__dirname)));

// API маршруты
// Используем уже созданный экземпляр контроллера
app.use('/stocks', stocksController.router);

// Маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
