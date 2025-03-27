const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filePath) {
        this.filePath = filePath;
        console.log(`DBConnector инициализирован с путем: ${this.filePath}`);
        
        // Проверяем существование директории
        const dir = path.dirname(this.filePath);
        if (!fs.existsSync(dir)) {
            console.log(`Создаем директорию: ${dir}`);
            fs.mkdirSync(dir, { recursive: true });
        }
        
        // Проверяем существование файла
        if (!fs.existsSync(this.filePath)) {
            console.log(`Файл не существует, создаем: ${this.filePath}`);
            this.write([]);
        } else {
            console.log(`Файл существует: ${this.filePath}`);
        }
    }

    read() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            console.log(`Данные успешно прочитаны из ${this.filePath}`);
            return JSON.parse(data);
        } catch (error) {
            console.error(`Ошибка чтения файла ${this.filePath}:`, error);
            return [];
        }
    }

    write(data) {
        try {
            const jsonString = JSON.stringify(data, null, 2);
            fs.writeFileSync(this.filePath, jsonString, 'utf8');
            console.log(`Данные успешно записаны в ${this.filePath}`);
            return true;
        } catch (error) {
            console.error(`Ошибка записи в файл ${this.filePath}:`, error);
            return false;
        }
    }
}

module.exports = { DBConnector };
