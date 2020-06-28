function forms() {
    
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
}

module.exports = forms;