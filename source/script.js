"use strict";

// const form = document.querySelector(".form");

// form.addEventListener("submit", function(e){
//     formSend(e, this);
// })

// function formSend(e, form) {
//     let errors = formValidate(form);

//     if(errors > 0){
//         e.preventDefault();
//     }
// }

// function formValidate(form) {
//     let errors = 0;
//     const reqInputs = form.querySelectorAll("._req");

//     for(let reqInput of reqInputs){

//         reqInput.classList.remove("_err");

//         if(!reqInput.value){
//             errors++;
//             reqInput.classList.add("_err");
//             reqInput.nextElementSibling.textContent = "Это поле должно быть заполнено.";
//             continue;
//         }
//         if(reqInput.getAttribute("type") === "email" && emailTest(reqInput)){
//             errors++;
//             reqInput.classList.add("_err");
//             reqInput.nextElementSibling.textContent = "Неверный E-mail.";
//         }
//         if(reqInput.getAttribute("type") === "tel" && phoneNumberTest(reqInput)){
//             errors++;
//             reqInput.classList.add("_err");
//             reqInput.nextElementSibling.textContent = "Неверный номер телефона.";
//         }
//     }

//     return errors;
// }

// function emailTest(input) {
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); // Если e-mail не правильный, то выдает true
// }

// function phoneNumberTest(input) {
//     return !/^([0-9\(\)\/\+ \-]*)$/.test(input.value);
// }

/////////////////////////////////////////////////////////////////////////////

const form = document.querySelector(".form");

form.addEventListener("submit", function(e){
    formSend(e, this);
})

function formSend(e, form) {
    let errors = formValidate(form);

    let formData = new FormData(form);    

    if(errors > 0){
        e.preventDefault();
    } else {
        form.classList.add("_sending");
        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData,
        });
        if(response.ok){
            let result = await response.json();
            alert(result.message);
            form.reset();
            form.classList.remove("_sending");
        } else {
            alert("Ошибка!");
            form.classList.remove("_sending");
        }
    }
}

function formValidate(form) {
    let errors = 0;
    const reqInputs = form.querySelectorAll("._req");

    for(let reqInput of reqInputs){

        reqInput.classList.remove("_err");

        if(!reqInput.value){
            errors++;
            reqInput.classList.add("_err");
            reqInput.nextElementSibling.textContent = "Это поле должно быть заполнено.";
            continue;
        }
        if(reqInput.getAttribute("type") === "email" && emailTest(reqInput)){
            errors++;
            reqInput.classList.add("_err");
            reqInput.nextElementSibling.textContent = "Неверный E-mail.";
        }
        if(reqInput.getAttribute("type") === "tel" && phoneNumberTest(reqInput)){
            errors++;
            reqInput.classList.add("_err");
            reqInput.nextElementSibling.textContent = "Неверный номер телефона.";
        }
    }

    return errors;
}

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value); // Если e-mail не правильный, то выдает true
}

function phoneNumberTest(input) {
    return !/^([0-9\(\)\/\+ \-]*)$/.test(input.value);
}