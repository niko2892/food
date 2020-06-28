function modal() {

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

}

module.exports = modal;