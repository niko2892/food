import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from'./modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from'./modules/slider';
import {showModalWindow} from './modules/modal';


window.addEventListener('DOMContentLoaded', function() {
    
    const timerModalWindow = setTimeout(() => showModalWindow('.modal', timerModalWindow), 600000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timerModalWindow);
    timer('.timer', '2020-10-06');
    cards();
    calc();
    forms('form', timerModalWindow);
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
});
