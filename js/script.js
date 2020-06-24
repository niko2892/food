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

    const getResource = async (url) => { //получаю краточки меню из db.json
        const res = await fetch(url); //делаю, чтобы фетч выкидывал ошибку
            if(!res.ok){ //если что-то не так (.ок)
                throw new Error(`Couldn't getch ${url}, status: ${res.status}`); //выкидываю(throw) объект ошибки 
            }
        return await res.json(); //and here, because I'll wate promise
    };

    getResource('http://localhost:3000/menu')
        .then(data => { //получаю карточки с сервера
            data.forEach(({img, altimg, title, descr, price}) => { //дестриктуризация объектов карточек на сервере
                new Menu(img, altimg, title, descr, price, ".menu .container").createMenuItem();
            });
        });

    

    //send formData to server

    const forms = document.querySelectorAll('form');

    const message = {
        loading: "img/form/spinner.svg",
        success: "Thank you! We will call you soon!",
        failure: "Something went wrong.."
    };

    forms.forEach(item => { //add function postData for each form
        bindPostData(item);
    });

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

            postData("http://localhost:3000/requests",json) //use fetch
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
   
    //slider

    const prev = document.querySelector(".offer__slider-prev"),
          current = document.querySelector("#current"),
          total = document.querySelector("#total"),
          next = document.querySelector(".offer__slider-next"),
          slides = document.querySelectorAll(".offer__slide");

    let position = 1;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlide(n) {

        if (n > slides.length) {
            position = 1;
        }

        if (n < 1) {
            position = slides.length;
        }

        slides.forEach(slide => {
            slide.style.display = "none";
        });

        slides[position - 1].style.display = "block";

        if (position < 10) {
            current.textContent = `0${position}`;
        } else {
            current.textContent = position;
        }

    }

    prev.addEventListener("click", () => {
        showSlide(position += -1);
    });

    next.addEventListener("click", () => {
        showSlide(position += 1);
    });

    showSlide(position);
});