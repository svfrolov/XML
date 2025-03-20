export class PhotoCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML(data) {
        return (
            `
                <div class="col">
                    <div class="card">
                        <img class="card-img-top" src="${data.src}" alt="${data.title}">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                            <div class="d-flex flex-column gap-2">
                                <div class="btn-group btn-group-sm" role="group" aria-label="Действия с фото">
                                    <button class="btn btn-primary" id="view-photo-${data.id}" data-id="${data.id}">Просмотр</button>
                                    <button class="btn btn-secondary" id="like-photo-${data.id}" data-id="${data.id}">Нравится</button>
                                    <button class="btn btn-info" id="share-photo-${data.id}" data-id="${data.id}">Поделиться</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        )
    }
    
    addListeners(data, listener) {
        document
            .getElementById(`view-photo-${data.id}`)
            .addEventListener("click", listener)
        
        document
            .getElementById(`like-photo-${data.id}`)
            .addEventListener("click", (e) => {
                alert(`Вы поставили лайк фотографии "${data.title}"`)
            })
        
        document
            .getElementById(`share-photo-${data.id}`)
            .addEventListener("click", (e) => {
                alert(`Вы поделились фотографией "${data.title}"`)
            })
    }
    
    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, listener)
    }
}
