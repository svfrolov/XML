// Функция для кнопки "луна" - расчет времени падения на Луне
function calculateLunarFallTime() {
    // Проверяем, нужно ли сначала закончить вычисление
    if (operation && !newNumberFlag) {
        calculate();
    }
    
    // Получаем высоту падения (текущее значение на дисплее)
    const height = parseFloat(displayValue);
    
    // Проверка на отрицательное значение высоты
    if (height < 0) {
        displayValue = "Ошибка";
        updateDisplay();
        return;
    }
    
    // Расчет времени падения на Луне
    // Формула: t = sqrt(2h/g), где g = 1.62 м/с² для Луны
    const lunarGravity = 1.62; // м/с²
    const fallTime = Math.sqrt((2 * height) / lunarGravity);
    
    // Округляем до 2 десятичных знаков и выводим результат
    displayValue = fallTime.toFixed(2) + " с";
    updateDisplay();
    newNumberFlag = true;
}

// Добавляем обработчик события для кнопки Луна
document.addEventListener('DOMContentLoaded', function() {
    const lunaButton = document.getElementById('btn_op_luna');
    if (lunaButton) {
        lunaButton.addEventListener('click', calculateLunarFallTime);
    }
});
