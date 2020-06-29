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

export {getResource};
export {postData};