document.addEventListener('DOMContentLoaded', () => {

    //tabs

    const tabsParent = document.querySelector('.tabheader__items'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsButtons = document.querySelectorAll('.tabheader__item');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabsButtons.forEach(btn => {
            btn.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";

        tabsButtons[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabsButtons.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });

        }
    });


    //timer

    const deadline = '2020-10-06';

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
    setClock('.timer', deadline);

    //modal

    const modalButtons = document.querySelectorAll('.btn'),
          modalWindow = document.querySelector('.modal');


    function showModalWindow() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(timerModalWindow);
    }

    function closeModalWindow() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';

    }

    modalButtons.forEach(btn => {
        btn.addEventListener('click', showModalWindow);
    });


   modalWindow.addEventListener("click", (e) => {    //закрытие при клике на подложку и крестик
        if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
            closeModalWindow();
        }
    });
    

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.style.display == 'block') {
            closeModalWindow();
        }
    });

    const timerModalWindow = setTimeout(() => {
        showModalWindow();
    }, 60000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModalWindow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

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

    new Menu("img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229',
        ".menu .container", //добавляю класс как rest оператор для div
        'menu__item'
    ).createMenuItem();

    new Menu("img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229',
        ".menu .container", //добавляю класс как rest оператор для div
        'menu__item'
    ).createMenuItem();

    new Menu("img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        '229',
        ".menu .container", //добавляю класс как rest оператор для div
        'menu__item'
    ).createMenuItem();


    //send formData to server.php

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "img/form/spinner.svg",
        success: "Thank you! We will call you soon!",
        failure: "Something went wrong.."
    };

    forms.forEach(item => { //add function postData for each form
        postData(item);
    });

    function postData(form) { //create f, witch will send formData to server.php
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //cancel reboot page after submit form

            let statusMessage = document.createElement("img"); //message for user
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage); //add div with message after form

            const request = new XMLHttpRequest();
            request.open("POST", "server.php");

            const formData = new FormData(form); //arg form from func postData (FormData is spec.obj.)
            request.send(formData); //POST data from forms

            request.addEventListener('load', () => { //check request condition after submit form
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success); //message for user if all was good
                    form.reset(); //clear form after form submit
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        // prevModalDialog.classList.add('hide');
        prevModalDialog.style.display = "none";
        showModalWindow();

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
            // prevModalDialog.classList.add('show');
            // prevModalDialog.classList.remove('hide');
            closeModalWindow();
        }, 4000);
    }
    fetch("db.json") //получаю данные из db.json
    .then(data => data.json())
    .then(result => console.log(result));
});