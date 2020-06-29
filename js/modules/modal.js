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

export default modal;
export {showModalWindow};
export {closeModalWindow};