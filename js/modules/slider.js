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

export default slider;