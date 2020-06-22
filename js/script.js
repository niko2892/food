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

function showTabContent(i = 0){
    tabsContent[i].style.display = "block";

    tabsButtons[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    
    if(target && target.classList.contains('tabheader__item')){
        tabsButtons.forEach((item, i) => {
            if(target == item){
                hideTabContent();
                showTabContent(i);
            }
        });
        
    }
});


//timer

const  deadline = '2020-10-06';

    function getTimeDifference(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num){
    if(num >= 0 && num < 10) {
        return '0' + num;
    }else{
        return num;
    }
}

function setClock(selector, endtime){
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

        if(t.total <= 0){
            clearInterval(timeInterval);
        }
    }

}
setClock('.timer', deadline);

//modal

const modalButtons = document.querySelectorAll('.btn'),
      modalWindow = document.querySelector('.modal'),
      modalClose = document.querySelector('.modal__close');
      

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

modalClose.addEventListener("click", closeModalWindow);

modalWindow.addEventListener('click', (e) => { //закрытие при клике на подложку
    if (e.target === modalWindow) {
        closeModalWindow();
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape' && modalWindow.style.display == 'block'){
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
    constructor(src, alt, title, descr, price, parentSelector){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        }
        
        createMenuItem(){
            const div = document.createElement('div');

            div.innerHTML = `
            <div class="menu__item">
                <img src = ${this.src} alt = ${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
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
".menu .container"
 ).createMenuItem();

 new Menu("img/tabs/vegy.jpg",
"vegy",
'Меню "Фитнес"',
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
'229',
".menu .container"
 ).createMenuItem();

 new Menu("img/tabs/vegy.jpg",
"vegy",
'Меню "Фитнес"',
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
'229',
".menu .container"
 ).createMenuItem();
 