export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML(data) {
        return (
            `<button class="btn btn-primary" id="back-button">${data.text}</button>`
        );
    }
    
    addListeners(data) {
        const backButton = document.getElementById('back-button');
        console.log("Добавляем обработчик для кнопки 'Назад':", backButton);
        
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                console.log("Кнопка 'Назад' была нажата");
                if (typeof data.onClick === 'function') {
                    data.onClick(e);
                } else {
                    console.error("Обработчик onClick не является функцией:", data.onClick);
                }
            });
        } else {
            console.error("Кнопка 'Назад' не найдена");
        }
    }
    
    render(data) {
        // Создаем новый div для кнопки
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '15px';
        buttonContainer.style.display = 'block';
        buttonContainer.style.clear = 'both';
        
        // Добавляем этот div после родительского элемента
        this.parent.parentNode.insertBefore(buttonContainer, this.parent.nextSibling);
        
        // Рендерим кнопку в новый контейнер
        const html = this.getHTML(data);
        buttonContainer.insertAdjacentHTML('beforeend', html);
        this.addListeners(data);
    }
}
