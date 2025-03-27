const express = require('express');
const { StocksService } = require('./StocksService');

class StocksController {
    constructor() {
        this.router = express.Router();
        this.service = new StocksService();
        this.setupRoutes();
    }

    setupRoutes() {
        // GET /stocks - получить все карточки
        this.router.get('/', this.findStocks.bind(this));
        
        // GET /stocks/:id - получить карточку по ID
        this.router.get('/:id', this.findStockById.bind(this));
        
        // POST /stocks - добавить новую карточку
        this.router.post('/', this.addStock.bind(this));
        
        // PATCH /stocks/:id - обновить карточку
        this.router.patch('/:id', this.updateStock.bind(this));
        
        // DELETE /stocks/:id - удалить карточку
        this.router.delete('/:id', this.deleteStock.bind(this));
    }

    findStocks(req, res) {
        try {
            const stocks = this.service.findStocks();
            res.json(stocks);
        } catch (err) {
            console.error('Ошибка при получении всех карточек:', err);
            res.status(400).json({ status: 'Bad Request', message: err.message });
        }
    }

    findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const stock = this.service.findStockById(id);
            
            if (!stock) {
                return res.status(404).json({ status: 'Not Found', message: `Карточка с ID ${id} не найдена` });
            }
            
            res.json(stock);
        } catch (err) {
            console.error(`Ошибка при получении карточки с ID ${req.params.id}:`, err);
            res.status(400).json({ status: 'Bad Request', message: err.message });
        }
    }

    addStock(req, res) {
        try {
            const stock = this.service.createStock(req.body);
            res.status(201).json(stock);
        } catch (err) {
            console.error('Ошибка при добавлении карточки:', err);
            
            // Если ошибка связана с дубликатом ID, возвращаем статус 409 Conflict
            if (err.message.includes('уже существует')) {
                res.status(409).json({ 
                    status: 'Conflict', 
                    message: err.message 
                });
            } else {
                res.status(400).json({ 
                    status: 'Bad Request', 
                    message: err.message 
                });
            }
        }
    }
    

    deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const success = this.service.deleteStock(id);
            
            if (!success) {
                return res.status(404).json({ status: 'Not Found', message: `Карточка с ID ${id} не найдена` });
            }
            
            res.json({ status: 'Success', message: `Карточка с ID ${id} успешно удалена` });
        } catch (err) {
            console.error(`Ошибка при удалении карточки с ID ${req.params.id}:`, err);
            res.status(400).json({ status: 'Bad Request', message: err.message });
        }
    }

    updateStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const updatedStock = this.service.updateStock(id, req.body);
            
            if (!updatedStock) {
                return res.status(404).json({ status: 'Not Found', message: `Карточка с ID ${id} не найдена` });
            }
            
            res.json(updatedStock);
        } catch (err) {
            console.error(`Ошибка при обновлении карточки с ID ${req.params.id}:`, err);
            res.status(400).json({ status: 'Bad Request', message: err.message });
        }
    }
}

// Создаем экземпляр контроллера для экспорта
const stocksController = new StocksController();

module.exports = stocksController;
