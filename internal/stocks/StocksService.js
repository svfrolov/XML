const { StocksRepository } = require('./StocksRepository');

class StocksService {
    constructor() {
        this.repository = new StocksRepository();
    }

    findStocks() {
        try {
            return this.repository.getAll();
        } catch (error) {
            console.error('Ошибка в сервисе при получении всех карточек:', error);
            throw new Error('Не удалось получить карточки');
        }
    }

    findStockById(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Некорректный ID карточки');
            }
            
            return this.repository.getById(id);
        } catch (error) {
            console.error(`Ошибка в сервисе при получении карточки с ID ${id}:`, error);
            throw new Error(`Не удалось получить карточку с ID ${id}`);
        }
    }

    createStock(stockData) {
        try {
            // Проверка наличия обязательных полей
            if (!stockData.id) {
                throw new Error('ID карточки обязателен');
            }
            
            // Преобразование ID в число, если это строка
            if (typeof stockData.id === 'string') {
                stockData.id = parseInt(stockData.id, 10);
            }
            
            // Проверка валидности ID
            if (isNaN(stockData.id)) {
                throw new Error('ID карточки должен быть числом');
            }
            
            return this.repository.create(stockData);
        } catch (error) {
            // Пробрасываем ошибку о дубликате дальше
            if (error.message.includes('уже существует')) {
                throw error;
            }
            console.error('Ошибка в сервисе при создании карточки:', error);
            throw new Error('Не удалось создать карточку');
        }
    }

    updateStock(id, stockData) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Некорректный ID карточки');
            }
            
            // Преобразование ID в число, если это строка
            if (typeof id === 'string') {
                id = parseInt(id, 10);
            }
            
            return this.repository.update(id, stockData);
        } catch (error) {
            console.error(`Ошибка в сервисе при обновлении карточки с ID ${id}:`, error);
            throw error;
        }
    }

    deleteStock(id) {
        try {
            if (!id || isNaN(id)) {
                throw new Error('Некорректный ID карточки');
            }
            
            // Преобразование ID в число, если это строка
            if (typeof id === 'string') {
                id = parseInt(id, 10);
            }
            
            return this.repository.delete(id);
        } catch (error) {
            console.error(`Ошибка в сервисе при удалении карточки с ID ${id}:`, error);
            throw error;
        }
    }
}

module.exports = { StocksService };
