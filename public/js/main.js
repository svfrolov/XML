// Функция для загрузки карточек с сервера
async function loadStocks() {
    try {
        const response = await fetch('/db/stocks.json'); // Исправленный путь
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const stocks = await response.json();
        displayStocks(stocks);
    } catch (error) {
        console.error('Ошибка при загрузке карточек:', error);
        document.getElementById('stocks-cards').innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Не удалось загрузить карточки. Пожалуйста, попробуйте позже.</p>
            </div>
        `;
    }
}


// Функция для отображения карточек на странице
function displayStocks(stocks) {
    const stocksContainer = document.getElementById('stocks-cards');
    
    if (!stocks || stocks.length === 0) {
        stocksContainer.innerHTML = `
            <div class="col-12 text-center">
                <p>Нет доступных карточек.</p>
            </div>
        `;
        return;
    }
    
    let stocksHTML = '';
    
    stocks.forEach(stock => {
        stocksHTML += `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${stock.name || 'Без названия'}</h5>
                        <p class="card-text">ID: ${stock.id}</p>
                        ${stock.price ? `<p class="card-text">Цена: ${stock.price} ₽</p>` : ''}
                        ${stock.quantity ? `<p class="card-text">Количество: ${stock.quantity}</p>` : ''}
                        ${stock.description ? `<p class="card-text">${stock.description}</p>` : ''}
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary" onclick="viewStockDetails(${stock.id})">Подробнее</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    stocksContainer.innerHTML = stocksHTML;
}

// Функция для просмотра деталей карточки
function viewStockDetails(id) {
    alert(`Просмотр деталей карточки с ID: ${id}`);
    // Здесь можно добавить код для перехода на страницу с деталями карточки
    // или открытия модального окна с подробной информацией
}

// Загрузка карточек при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadStocks();
});
