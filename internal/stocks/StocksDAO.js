const { StocksRepository } = require('./StocksRepository');

class StockDAO {
    constructor(id, src, title, text) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.text = text;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('Invalid id');
        }
    }

    static find() {
        const stocks = StocksRepository.read();

        return stocks.map(({ id, src, title, text }) => {
            return new this(id, src, title, text);
        });
    }

    static findById(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const stock = stocks.find((s) => s.id === id);

        if (!stock) {
            throw new Error(`Stock with id ${id} not found`);
        }

        return new this(stock.id, stock.src, stock.title, stock.text);
    }

    static insert(stock) {
        const stocks = StocksRepository.read();
        
        // Проверка на существование записи с таким же id
        const existingStock = stocks.find(s => s.id === stock.id);
        if (existingStock) {
            throw new Error(`Stock with id ${stock.id} already exists`);
        }
        
        StocksRepository.write([...stocks, stock]);
        return new this(stock.id, stock.src, stock.title, stock.text);
    }
    

    static delete(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.id !== id);

        StocksRepository.write(filteredStocks);

        return filteredStocks.map(({ id, src, title, text }) => {
            return new this(id, src, title, text);
        });
    }

    static update(id, stockData) {
        this._validateId(id);
        
        const stocks = StocksRepository.read();
        const stockIndex = stocks.findIndex(s => s.id === id);
        
        if (stockIndex === -1) {
            throw new Error(`Stock with id ${id} not found`);
        }
        
        // Обновляем только переданные поля
        const updatedStock = {
            ...stocks[stockIndex],
            ...stockData,
            id: id // Гарантируем, что id не изменится
        };
        
        stocks[stockIndex] = updatedStock;
        StocksRepository.write(stocks);
        
        return new this(updatedStock.id, updatedStock.src, updatedStock.title, updatedStock.text);
    }
    

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            title: this.title,
            text: this.text,
        };
    }
}

module.exports = {
    StockDAO,
};
