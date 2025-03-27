export class PhotoComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML(data) {
        return (
            `
                <div class="card mb-3">
                    <img src="${data.src}" alt="${data.title}" class="card-img-top">
                    </div>
                </div>
            `
        )
    }
    
    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Отладка изображения
        console.log("Отображаем изображение:", data.src);
        
        const img = this.parent.querySelector('img');
        img.onerror = function() {
            console.error("Ошибка загрузки изображения:", this.src);
            this.src = "https://via.placeholder.com/800x600?text=Изображение+не+найдено";
        };
        
        img.onload = function() {
            console.log("Изображение успешно загружено:", this.src);
        };
    }
}
