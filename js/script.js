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

// Смена знака числа
function changeSign() {
    displayValue = (parseFloat(displayValue) * -1).toString();
    updateDisplay();
}

// Вычисление процента
function calculatePercent() {
    displayValue = (parseFloat(displayValue) / 100).toString();
    updateDisplay();
}

// Установка операции
function setOperation(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);
    } else if (!newNumberFlag) {
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
    
    const secondNumber = parseFloat(displayValue);
    let result;
    
    switch (operation) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
        case "x":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                result = "Ошибка";
            } else {
                result = firstNumber / secondNumber;
            }
            break;
    }
    
    displayValue = typeof result === "number" ? result.toString() : result;
    operation = null;
    firstNumber = null;
    newNumberFlag = true;
    updateDisplay();
}

// Добавляем обработчики событий для кнопок
document.addEventListener('DOMContentLoaded', function() {
    // Цифры
    document.getElementById('btn_digit_0').addEventListener('click', function() { addNumber('0'); });
    document.getElementById('btn_digit_1').addEventListener('click', function() { addNumber('1'); });
    document.getElementById('btn_digit_2').addEventListener('click', function() { addNumber('2'); });
    document.getElementById('btn_digit_3').addEventListener('click', function() { addNumber('3'); });
    document.getElementById('btn_digit_4').addEventListener('click', function() { addNumber('4'); });
    document.getElementById('btn_digit_5').addEventListener('click', function() { addNumber('5'); });
    document.getElementById('btn_digit_6').addEventListener('click', function() { addNumber('6'); });
    document.getElementById('btn_digit_7').addEventListener('click', function() { addNumber('7'); });
    document.getElementById('btn_digit_8').addEventListener('click', function() { addNumber('8'); });
    document.getElementById('btn_digit_9').addEventListener('click', function() { addNumber('9'); });
    document.getElementById('btn_digit_dot').addEventListener('click', addDecimal);
    
    // Операции
    document.getElementById('btn_op_clear').addEventListener('click', clearDisplay);
    document.getElementById('btn_op_sign').addEventListener('click', changeSign);
    document.getElementById('btn_op_percent').addEventListener('click', calculatePercent);
    document.getElementById('btn_op_div').addEventListener('click', function() { setOperation('/'); });
    document.getElementById('btn_op_mult').addEventListener('click', function() { setOperation('*'); });
    document.getElementById('btn_op_minus').addEventListener('click', function() { setOperation('-'); });
    document.getElementById('btn_op_plus').addEventListener('click', function() { setOperation('+'); });
    document.getElementById('btn_op_equal').addEventListener('click', calculate);
});
