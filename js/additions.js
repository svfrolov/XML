document.addEventListener('DOMContentLoaded', function() {
    // Создаем контейнер для дополнительных элементов
    const calculator = document.querySelector('div');
    const additionalContainer = document.createElement('div');
    additionalContainer.className = 'additional-container';
    calculator.parentNode.insertBefore(additionalContainer, calculator.nextSibling);
    
    
    // Создаем основной сворачивающийся блок
    const mainDetails = document.createElement('details');
    mainDetails.className = 'main-details';
    const mainSummary = document.createElement('summary');
    mainSummary.textContent = 'Дополнительные опции';
    mainDetails.appendChild(mainSummary);
    
    // Создаем контейнер для содержимого внутри details
    const detailsContent = document.createElement('div');
    detailsContent.className = 'details-content';
    mainDetails.appendChild(detailsContent);
    
    // 1. Добавляем надпись внизу калькулятора
    const authorInfo = document.createElement('div');
    authorInfo.className = 'author-info';
    authorInfo.textContent = 'ЛР выполнена Фролов С.В.';
    detailsContent.appendChild(authorInfo);
    
    // 2. Добавляем кнопку для смены цвета фона
    const changeBgButton = document.createElement('button');
    changeBgButton.className = 'change-bg-button';
    changeBgButton.textContent = 'Сменить фон';
    changeBgButton.addEventListener('click', function() {
        const colors = ['#1e1e1e', '#2c3e50', '#34495e', '#3498db', '#8e44ad', '#2ecc71'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });
    detailsContent.appendChild(changeBgButton);
    
    // 3. Добавляем кнопку со ссылкой на GitHub
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/svfrolov/xml';
    githubLink.target = '_blank';
    const githubButton = document.createElement('button');
    githubButton.className = 'github-button';
    githubButton.textContent = 'GitHub';
    githubLink.appendChild(githubButton);
    detailsContent.appendChild(githubLink);
    
    // 4. Добавляем поле с выпадающим списком
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'dropdown-container';
    const themeLabel = document.createElement('label');
    themeLabel.setAttribute('for', 'theme-select');
    themeLabel.textContent = 'Тема:';
    const themeSelect = document.createElement('select');
    themeSelect.id = 'theme-select';
    
    const themes = [
        { value: 'default', text: 'Стандартная' },
        { value: 'light', text: 'Светлая' },
        { value: 'dark', text: 'Темная' },
        { value: 'neon', text: 'Неоновая' }
    ];
    
    themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.value;
        option.textContent = theme.text;
        themeSelect.appendChild(option);
    });
    
    // Добавляем обработчик события для изменения темы
    themeSelect.addEventListener('change', function() {
        const selectedTheme = themeSelect.value;
        
        // Объект с цветами для разных тем
        const themeColors = {
            'default': '#ffffff',
            'light': '#f5f5f5',
            'dark': '#1e1e1e',
            'neon': '#0a0a2a'
        };
        
        // Применяем выбранный цвет темы
        if (themeColors[selectedTheme]) {
            document.body.style.backgroundColor = themeColors[selectedTheme];
        }
    });
    
    dropdownContainer.appendChild(themeLabel);
    dropdownContainer.appendChild(themeSelect);
    detailsContent.appendChild(dropdownContainer);
    
    // 5. Добавляем сворачивающиеся и разворачивающиеся подробности
    const detailsSection = document.createElement('details');
    detailsSection.className = 'details-section';
    const summary = document.createElement('summary');
    summary.textContent = 'Информация о разработчике';
    
    const authorParagraph = document.createElement('p');
    authorParagraph.innerHTML = '<strong>Автор:</strong> Фролов С.В.';
    
    const groupParagraph = document.createElement('p');
    groupParagraph.innerHTML = '<strong>Группа:</strong> ИУ5-43БВ';
    
    detailsSection.appendChild(summary);
    detailsSection.appendChild(authorParagraph);
    detailsSection.appendChild(groupParagraph);
    detailsContent.appendChild(detailsSection);
    
    // 6. Добавляем поле с целью ЛР и подсвечиваем слова
    const purposeSection = document.createElement('div');
    purposeSection.className = 'purpose-section';
    
    const purposeHeader = document.createElement('h3');
    purposeHeader.textContent = 'Цель лабораторной работы:';
    
    const purposeText = document.createElement('p');
    purposeText.innerHTML = '<mark>Знакомство</mark> с основами веб-разработки, включая изучение языка разметки <mark>HTML</mark> и каскадных таблиц стилей <mark>CSS</mark> для создания интерактивных веб-приложений.';
    
    purposeSection.appendChild(purposeHeader);
    purposeSection.appendChild(purposeText);
    detailsContent.appendChild(purposeSection);
    
    // Добавляем весь сворачивающийся блок в контейнер
    additionalContainer.appendChild(mainDetails);
});
