import {PhotoCardComponent} from "../../components/photo-card/index.js";
import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }
    
    getData() {
        return [
            {
                id: 1,
                src: "img/gallery/photo1.jpg",
                title: "Ползущий",
                text: "Тяжело в учении"
            },
            {
                id: 2,
                src: "img/gallery/photo2.jpg",
                title: "Лежащий",
                text: "Отлично прилёг"
            },
            {
                id: 3,
                src: "img/gallery/photo3.jpg",
                title: "Кричащий",
                text: "Нужна помощь, спасите"
            },
        ]
    }
    
    
    get pageRoot() {
        return document.getElementById('main-page')
    }
    
    getHTML() {
        return (
            `
                <div id="main-page" class="container mt-5">
                    <div class="d-flex flex-wrap justify-content-center gap-4"></div>
                </div>
            `
        )
    }
    
    
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const data = this.getData()
        data.forEach((item) => {
            const photoCard = new PhotoCardComponent(this.pageRoot.querySelector('.d-flex'))
            photoCard.render(item, this.clickCard.bind(this))
        })
    }
}
