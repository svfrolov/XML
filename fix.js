const fs = require('fs');
const path = require('path');

// Пример данных для акций
const stocks = [
  {
    id: 1,
    src: "https://example.com/image1.jpg",
    name: "Apple Inc.",
    ticker: "AAPL",
    price: 150.25,
    change: 2.5
  },
  {
    id: 2,
    src: "https://example.com/image2.jpg",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    price: 290.75,
    change: -1.2
  }
];

// Проверяем, существует ли директория db, если нет - создаем
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('Создана директория db');
}

// Записываем данные в файл в директории db
fs.writeFileSync(
  path.join(__dirname, 'db', 'stocks.json'),
  JSON.stringify(stocks, null, 2),
  'utf8'
);

console.log('Файл stocks.json успешно создан в директории db');