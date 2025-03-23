// check-imports.js
console.log('Проверка импортов...');

try {
    const { StockDAO } = require('./internal/stocks/StocksDAO');
    console.log('✅ StockDAO импортирован успешно:', StockDAO);
} catch (error) {
    console.error('❌ Ошибка при импорте StockDAO:', error.message);
}

try {
    const { StocksService } = require('./internal/stocks/StocksService');
    console.log('✅ StocksService импортирован успешно:', StocksService);
} catch (error) {
    console.error('❌ Ошибка при импорте StocksService:', error.message);
}

try {
    const { StocksController } = require('./internal/stocks/StocksController');
    console.log('✅ StocksController импортирован успешно:', StocksController);
} catch (error) {
    console.error('❌ Ошибка при импорте StocksController:', error.message);
}
