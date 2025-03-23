const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filename) {
        this.filename = filename;
    }

    readFile() {
        return fs.readFileSync(path.join(process.cwd(), 'db', this.filename), 'utf8');
    }

    writeFile(data) {
        // Добавляем опцию для сохранения в UTF-8
        fs.writeFileSync(path.join(process.cwd(), 'db', this.filename), data, {encoding: 'utf8'});
    }
    
}

module.exports = {
    DBConnector,
};
