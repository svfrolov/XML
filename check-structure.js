// check-structure.js
const fs = require('fs');
const path = require('path');

function checkFile(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        console.log(`✅ Файл существует: ${filePath}`);
        return true;
    } catch (err) {
        console.log(`❌ Файл не найден: ${filePath}`);
        return false;
    }
}

const rootDir = __dirname;
console.log(`Корневая директория: ${rootDir}`);

// Проверяем основные файлы в корне
checkFile(path.join(rootDir, 'index.js'));
checkFile(path.join(rootDir, 'http-server.js'));
checkFile(path.join(rootDir, 'package.json'));
checkFile(path.join(rootDir, 'package-lock.json'));
checkFile(path.join(rootDir, 'README.md'));
checkFile(path.join(rootDir, 'fix-encoding.js'));
checkFile(path.join(rootDir, 'shema.txt'));

// Проверяем директорию bff
const bffDir = path.join(rootDir, 'bff');
if (fs.existsSync(bffDir)) {
    console.log(`✅ Директория существует: ${bffDir}`);
    checkFile(path.join(bffDir, 'index.js'));
} else {
    console.log(`❌ Директория не найдена: ${bffDir}`);
}

// Проверяем директорию db
const dbDir = path.join(rootDir, 'db');
if (fs.existsSync(dbDir)) {
    console.log(`✅ Директория существует: ${dbDir}`);
    checkFile(path.join(dbDir, 'stocks.json'));
} else {
    console.log(`❌ Директория не найдена: ${dbDir}`);
}

// Проверяем директорию internal/stocks
const internalStocksDir = path.join(rootDir, 'internal', 'stocks');
if (fs.existsSync(internalStocksDir)) {
    console.log(`✅ Директория существует: ${internalStocksDir}`);
    checkFile(path.join(internalStocksDir, 'index.js'));
    checkFile(path.join(internalStocksDir, 'StocksController.js'));
    checkFile(path.join(internalStocksDir, 'StocksDAO.js'));
    checkFile(path.join(internalStocksDir, 'StocksRepository.js'));
    checkFile(path.join(internalStocksDir, 'StocksService.js'));
} else {
    console.log(`❌ Директория не найдена: ${internalStocksDir}`);
}

// Проверяем директорию modules
const modulesDir = path.join(rootDir, 'modules');
if (fs.existsSync(modulesDir)) {
    console.log(`✅ Директория существует: ${modulesDir}`);
    checkFile(path.join(modulesDir, 'DBConnector.js'));
} else {
    console.log(`❌ Директория не найдена: ${modulesDir}`);
}
