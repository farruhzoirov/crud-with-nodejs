'use strict'

const nameInput = document.getElementById('name');
const phoneNumber = document.getElementById('phone');
const selectBox = document.querySelector('select');
const userCreateForm = document.querySelector('form');

const modalNameInput = document.getElementById('current-name');
const modalPhoneNumber = document.getElementById('current-phone');
const modalSelectBox = document.querySelector('.modal-selector');
const modalUserChangeForm = document.querySelector('.modal-form');

const tBody = document.querySelector('tbody');
const modalContainer = document.querySelector('.modal-container');
const modalBackdrop = document.querySelector('.modal-backdrop');


// userCreateForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const body = {
//         name: nameInput.value,
//         phone: phoneNumber.value,
//         tariff: selectBox.value
//     }
//
//     fetch('http://localhost:5000/create-user', {
//         headers: {'Content-type': 'application/json; charset=utf-8'},
//         method: 'POST',
//         body: JSON.stringify(body)
//     })
//         .then(res => res.json())
//         .then((res) => {
//             console.log(res)
//         })
// })

userCreateForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const body = {
        name: nameInput.value,
        phone: phoneNumber.value,
        tariff: selectBox.value
    };

    try {
        const response = await fetch('http://localhost:5000/create-user', {
            headers: {'Content-type': 'application/json; charset=utf-8'},
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});
