/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {

    //calc

    const result = document.querySelector('.calculating__result span');
    let sex,height, weight, age, ratio;

    if (localStorage.getItem('sex')) { //проверка хранилища на наличие данных
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female'; //запись в хранилище
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) { //установка классов активности кнопок в соответсвии с хранилищем
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if(!sex ||!height ||!weight ||!age ||!ratio){
            result.textContent = "Введите данные";
            return;
        } 

        if(sex === "female") {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) { //инфо с кнопок
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id')); //записываю выбор пользователя
                }
    
                console.log(ratio, sex);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInfirmation(selector){ //инфо с инпутов
        const input = document.querySelector(selector),
              messageIfNotNumber = document.createElement('div');

        document.querySelector('#constitution')
        .insertAdjacentElement('afterend', messageIfNotNumber);
        messageIfNotNumber.style.cssText = `
            display: none;
            color: red;
            text-align: center;
        `;
    
        messageIfNotNumber.textContent = "Ввoдите числa";

        input.addEventListener('input', () =>{

            if (input.value.match(/\D/g)) { //если пользователь ввел не число
                input.style.border = '1.5px solid red';
                messageIfNotNumber.style.display = '';
            } else {
                input.style.border = 'none';
                messageIfNotNumber.style.display = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                break;
                case 'weight':
                    weight = +input.value;
                break;
                case 'age':
                    age = +input.value;
                break;
            }
            calcTotal();
        });
    }
    getDynamicInfirmation('#height');
    getDynamicInfirmation('#weight');
    getDynamicInfirmation('#age');
}


/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
    .then(data => { //получаю карточки с сервера
        data.forEach(({img, altimg, title, descr, price}) => { //дестриктуризация объектов карточек на сервере
            new Menu(img, altimg, title, descr, price, ".menu .container").createMenuItem();
        });
    });

}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, timerModalWindow) {
    
//send formData to server

const forms = document.querySelectorAll(formSelector);

const message = {
    loading: "img/form/spinner.svg",
    success: "Thank you! We will call you soon!",
    failure: "Something went wrong.."
};

forms.forEach(item => { //add function postData for each form
    bindPostData(item);
});

function bindPostData(form) { //create f, witch will send formData to server
    form.addEventListener('submit', (e) => {
        e.preventDefault(); //cancel reboot page after submit form

        let statusMessage = document.createElement("img"); //message for user
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

        form.insertAdjacentElement('afterend', statusMessage); //add div with message after form

        const formData = new FormData(form); //arg form from func postData (FormData is spec.obj.)
        
        const json = JSON.stringify(Object.fromEntries(formData.entries())); //get norm object from FormData obj

        Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])("http://localhost:3000/requests",json) //use fetch
        .then(data =>{
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.style.display = "none";
    Object(_modal__WEBPACK_IMPORTED_MODULE_0__["showModalWindow"])('.modal', timerModalWindow);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.style.display = "block";
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModalWindow"])('.modal');
    }, 4000);
}
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, showModalWindow, closeModalWindow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showModalWindow", function() { return showModalWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModalWindow", function() { return closeModalWindow; });
function closeModalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function showModalWindow(modalSelector, timerModalWindow) {
    const modal = document.querySelector(modalSelector);

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (timerModalWindow) {
        clearInterval(timerModalWindow);
    }
}

function modal(triggerSelector, modalSelector, timerModalWindow) {

    //modal

    const modalButtons = document.querySelectorAll(triggerSelector),
          modalWindow = document.querySelector(modalSelector);

    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => showModalWindow(modalSelector, timerModalWindow));
    });


   modalWindow.addEventListener("click", (e) => {    //закрытие при клике на подложку и крестик
        if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
            closeModalWindow(modalSelector);
        }
    });
    

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.style.display == 'block') {
            closeModalWindow(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModalWindow(modalSelector, timerModalWindow);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    const prev = document.querySelector(prevArrow),
          current = document.querySelector(currentCounter),
          total = document.querySelector(totalCounter),
          next = document.querySelector(nextArrow),
          slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          slidesWrapper = document.querySelector(wrapper),
          slidesFiels = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width; //достаю назначенную браузером ширину слайда

    let position = 1,
        offset = 0;

    if (slides.length < 10){
        total.textContent = `0${slides.length}`;
        current.textContent = `0${position}`;
    } else {
        total.textContent = slides.length;
        current.textContent = position;
    }

    slidesFiels.style.width = 100 * slides.length + "%"; //ширина контейнера - родителя слайдов
    slidesFiels.style.display = "flex"; //расположение слайдов в ряд
    slidesFiels.style.transition = "0.5s all"; //плавное переключение слайдов

    slidesWrapper.style.overflow = "hidden"; //скрываю лишние слайды

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = []; //создаю массив для точек на слайдере

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; 
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot); // добавляю новые точки в массив
    }

    function deleteNotDigits(str){
        return +str.replace(/\D/g, ''); //replace(/\D/g, '') - регулярное выражеие. убирает все НЕ числа
    }
   
    next.addEventListener("click", () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { //если докрутил до последнего слайда 
            offset = 0; //возврат к первому
        } else {
            offset += deleteNotDigits(width); //если нет, то добавляю на ширину слайда
        }

        slidesFiels.style.transform = `translateX(-${offset}px)`; //прокрутка слайдов

        if (position == slides.length) { //нумерация слайдов
            position = 1;
        } else {
            position++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${position}`;
        } else {
            current.textContent =  position;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[position - 1].style.opacity = '1';
    });

    prev.addEventListener("click", () => {
        if (offset == 0) { //если докрутил до первого слайда
            offset = deleteNotDigits(width) * (slides.length - 1); //возврат к последему
        } else {
            offset -= deleteNotDigits(width); //если нет, то добавляю на ширину слайда
        }

        slidesFiels.style.transform = `translateX(-${offset}px)`;

        if (position == 1) {
            position = slides.length;
        } else {
            position--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${position}`;
        } else {
            current.textContent =  position;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[position - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            position = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesFiels.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent =  `0${position}`;
            } else {
                current.textContent =  position;
            }
            
            dots.forEach(dot => dot.style.opacity = ".5");
            dots[position - 1].style.opacity = '1';
        });
    });

}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
        //tabs

    const tabsParent = document.querySelector(tabsParentSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsButtons = document.querySelectorAll(tabsSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabsButtons.forEach(btn => {
            btn.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";

        tabsButtons[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) { //удаляю первый символ (точку)
            tabsButtons.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });

        }
    });

}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {

function getTimeDifference(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor((t / (1000 * 60 * 60 * 24))),
        seconds = Math.floor((t / 1000) % 60),
        minutes = Math.floor((t / 1000 / 60) % 60),
        hours = Math.floor((t / (1000 * 60 * 60) % 24));

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeDifference(endtime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

}
setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");










window.addEventListener('DOMContentLoaded', function() {
    
    const timerModalWindow = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["showModalWindow"])('.modal', timerModalWindow), 600000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', timerModalWindow);
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-10-06');
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', timerModalWindow);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: getResource, postData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
const postData = async (url, data) => { //async, cause server will response after some time
    const res = await fetch(url, { //have to wait here
        method: "POST",
        headers: { 
            "Content-type": "application/json"
        },
        body: data
    });
    return await res.json(); //and here, because I'll wate promise
};

const getResource = async (url) => { //получаю краточки меню из db.json
    const res = await fetch(url); //делаю, чтобы фетч выкидывал ошибку
        if(!res.ok){ //если что-то не так (.ок)
            throw new Error(`Couldn't getch ${url}, status: ${res.status}`); //выкидываю(throw) объект ошибки 
        }
    return await res.json(); //and here, because I'll wate promise
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map