const { DBConnector } = require('../../modules/DBConnector');
const path = require('path');

class StocksRepository {
    constructor() {
        // Используем абсолютный путь
        const filePath = path.resolve(__dirname, '../../db/stocks.json');
        console.log(`Инициализация StocksRepository с путем: ${filePath}`);
        this.dbConnector = new DBConnector(filePath);
    }

    getAll() {
        try {
            return this.dbConnector.read();
        } catch (error) {
            console.error('Ошибка при получении всех записей:', error);
            return [];
        }
    }

    getById(id) {
        try {
            const stocks = this.getAll();
            return stocks.find(stock => stock.id === id) || null;
        } catch (error) {
            console.error(`Ошибка при получении записи с id=${id}:`, error);
            return null;
        }
    }

    create(stock) {
        try {
            const stocks = this.getAll();
            
            // Проверка на существование карточки с таким же ID
            const existingStock = stocks.find(s => s.id === stock.id);
            if (existingStock) {
                throw new Error(`Карточка с ID=${stock.id} уже существует`);
            }
            
            stocks.push(stock);
            this.dbConnector.write(stocks);
            return stock;
        } catch (error) {
            if (error.message.includes('уже существует')) {
                // Пробрасываем ошибку о дубликате дальше
                throw error;
            }
            console.error('Ошибка при создании записи:', error);
            throw new Error('Не удалось создать запись');
        }
    }

    update(id, updatedData) {
        try {
            const stocks = this.getAll();
            const index = stocks.findIndex(stock => stock.id === id);
            
            if (index === -1) {
                throw new Error(`Карточка с ID=${id} не найдена`);
            }
            
            // Обновляем только переданные поля
            stocks[index] = { ...stocks[index], ...updatedData };
            
            this.dbConnector.write(stocks);
            return stocks[index];
        } catch (error) {
            console.error(`Ошибка при обновлении записи с id=${id}:`, error);
            throw error;
        }
    }

    delete(id) {
        try {
            const stocks = this.getAll();
            const index = stocks.findIndex(stock => stock.id === id);
            
            if (index === -1) {
                throw new Error(`Карточка с ID=${id} не найдена`);
            }
            
            const deletedStock = stocks[index];
            stocks.splice(index, 1);
            
            this.dbConnector.write(stocks);
            return deletedStock;
        } catch (error) {
            console.error(`Ошибка при удалении записи с id=${id}:`, error);
            throw error;
        }
    }
}

module.exports = { StocksRepository };
