// Функция для кнопки "луна" - расчет времени падения на Луне
function calculateLunarFallTime() {
    // Проверяем, нужно ли сначала закончить вычисление
    if (operation && !newNumberFlag) {
        // Если есть незавершенная операция, сначала вычисляем результат
        calculate();
    }
    
    // Получаем высоту из текущего значения на экране
    var height = parseFloat(displayValue); 
    
    // Ускорение свободного падения на Луне (м/с²)
    var lunarGravity = 1.62; 
    
    // Формула времени падения: t = √(2h/g)
    var fallTime = Math.sqrt((2 * height) / lunarGravity);
    
    // Округляем до 2 знаков после запятой
    displayValue = fallTime.toFixed(2);
    
    // Обновляем экран
    updateDisplay();
}
