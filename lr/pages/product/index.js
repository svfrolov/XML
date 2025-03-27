import {PhotoComponent} from "../../components/photo/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }
    
    getData() {
        // Получаем данные из MainPage по ID
        const mainPageData = new MainPage().getData();
        const photoData = mainPageData.find(item => item.id == this.id);
        
        if (photoData) {
            // Если нашли данные, добавляем дополнительную информацию
            return {
                ...photoData,
                author: "Студент - Фролов С.В ИУ5-43БВ",
                date: "01.03.2025"
            };
        }
        
        // Запасной вариант, если данные не найдены
        return {
            id: this.id,
            src: `img/gallery/photo${this.id}.jpg`,
            title: `Крот ${this.id}`,
            text: "Подробное описание фотографии",
            author: "Фотограф Иванов",
            date: "01.03.2025"
        };
    }
    
    get pageRoot() {
        return document.getElementById('product-page');
    }
    
    getHTML() {
        return `
            <div id="product-page" class="container mt-5">
                <div class="row">
                    <div class="col-md-8" id="photo-container"></div>
                    <div class="col-md-4" id="back-button-container"></div>
                </div>
                <div class="row mt-4">
                    <div class="col-md-12">
                        <h2>${this.getData().title}</h2>
                        <p>${this.getData().text}</p>
                        <p><strong>Автор:</strong> ${this.getData().author}</p>
                        <p><strong>Дата:</strong> ${this.getData().date}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const photoComponent = new PhotoComponent(this.pageRoot.querySelector('#photo-container'));
        photoComponent.render(this.getData());
        
        const backButtonComponent = new BackButtonComponent(this.pageRoot.querySelector('#back-button-container'));
        backButtonComponent.render({
            text: 'Назад',
            onClick: () => {
                console.log("Кнопка 'Назад' нажата");
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            }
        });
    }
}
