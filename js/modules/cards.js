import {getResource} from '../services/services';

function cards() {

//work with classes

class Menu {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) { //classes as rest
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes; //это rest operator, поэтому classes - массив!
        this.parent = document.querySelector(parentSelector);
    }

    createMenuItem() {
        const div = document.createElement('div');

        if (this.classes.length === 0) { //провеляю rest оператор. если ничего не было передано
            this.div = 'menu__item';
            div.classList.add(this.div); //назначаю по умолчани класс menu__item для div
        } else {
            this.classes.forEach(className => div.classList.add(className)); //присваиваю div класс из rest оператора classes
        }

        div.innerHTML = `
        <img src = ${this.src} alt = ${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}"</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    `;
        this.parent.append(div);
    }
}

getResource('http://localhost:3000/menu')
    .then(data => { //получаю карточки с сервера
        data.forEach(({img, altimg, title, descr, price}) => { //дестриктуризация объектов карточек на сервере
            new Menu(img, altimg, title, descr, price, ".menu .container").createMenuItem();
        });
    });

}

export default cards;