// Переменные для хранения значений
var displayValue = "0";  // текущее значение на экране
var firstNumber = null;  // первое число
var operation = null;    // текущая операция
var newNumberFlag = false;  // флаг для нового числа

// Обновление экрана калькулятора
function updateDisplay() {
    document.getElementById("result").innerText = displayValue;
}

// Добавление цифры
function addNumber(num) {
    if (displayValue === "0" || newNumberFlag) {
        displayValue = num;
        newNumberFlag = false;
    } else {
        displayValue = displayValue + num;
    }
    updateDisplay();
}

// Добавление десятичной точки
function addDecimal() {
    if (newNumberFlag) {
        displayValue = "0.";
        newNumberFlag = false;
    } else if (!displayValue.includes(".")) {
        displayValue = displayValue + ".";
    }
    updateDisplay();
}

// Очистка экрана
function clearDisplay() {
    displayValue = "0";
    firstNumber = null;
    operation = null;
    newNumberFlag = false;
    updateDisplay();
}

// Изменение знака числа
function changeSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

// Расчет процента
function calculatePercent() {
    if (firstNumber !== null && operation) {
        displayValue = (firstNumber * parseFloat(displayValue) / 100).toString();
    } else {
        displayValue = (parseFloat(displayValue) / 100).toString();
    }
    updateDisplay();
}

// Установка операции
function setOperation(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);
    } else if (operation) {
        calculate();
    }
    operation = op;
    newNumberFlag = true;
}

// Выполнение расчета
function calculate() {
    if (operation === null || newNumberFlag) {
        return;
    }
    
    var secondNumber = parseFloat(displayValue);
    var result = 0;
    
    if (operation === "+") {
        result = firstNumber + secondNumber;
    } else if (operation === "-") {
        result = firstNumber - secondNumber;
    } else if (operation === "*") {
        result = firstNumber * secondNumber;
    } else if (operation === "/") {
        result = firstNumber / secondNumber;
    }
    
    displayValue = result.toString();
    firstNumber = result;
    operation = null;
    newNumberFlag = true;
    updateDisplay();
}

// Инициализация дисплея при загрузке страницы
window.onload = function() {
    updateDisplay();
};
