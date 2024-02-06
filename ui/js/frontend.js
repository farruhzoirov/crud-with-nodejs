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


let userId;

// I am going to add user's data to table
const fetchUserData = () => {
  fetch('http://localhost:5000/get-users', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
  })
      .then(res => res.json())
      .then(res => {
        const responseBody = res;
        tBody.innerHTML = '';
        responseBody.users.forEach((item) => {
          tBody.innerHTML += `
              <tr>
                  <td>${item.name}</td>
                  <td>${item.phone}</td>
                  <td>${item.tariff}</td>
                  <td>
                     <button class="btn btn-primary" onclick="modalPressingHandler(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>
                     <button onclick="deleteUser(${item.id})" class="delete-btn btn btn-danger">Delete</button>
                  </td>
              </tr>
           `
        })
      })
}

fetchUserData()


// When modal opens
const modalPressingHandler = (id) => {
  userId = +id;
  fetch('http://localhost:5000/get-users', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
  })
      .then(res => res.json())
      .then(res => {
        const responseBody = res;
        responseBody.users.forEach((item) => {
          if (item.id === id) {
            modalNameInput.value = item.name
            modalPhoneNumber.value = item.phone
            modalSelectBox.value = item.tariff
          }
        })
      })
}


modalUserChangeForm.addEventListener('submit',  (e) => {
  e.preventDefault();
  const changedBody = {
    id: userId,
    name: modalNameInput.value,
    phone: modalPhoneNumber.value,
    tariff: modalSelectBox.value
  }

  fetch('http://localhost:5000/update-user', {
    headers:{
      'Content-type':'application/json; charset=utf-8'
    },
    method: 'POST',
    body:JSON.stringify(changedBody)
  })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          const modal = document.getElementById('exampleModal');
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
          const modalBackdrop = document.querySelector('.modal-backdrop');
          modalBackdrop.parentNode.removeChild(modalBackdrop);
          fetchUserData();
        }
      })
})


// When i am going to delete one user's data

const deleteUser = (id) => {
  fetch('http://localhost:5000/delete-user', {
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    method: 'POST',
    body: JSON.stringify({id})

  })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          fetchUserData()
        }
      })
}

// I am going to listen main form
userCreateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const body = {
    name: nameInput.value,
    phone: phoneNumber.value,
    tariff: selectBox.value
  }

  fetch('http://localhost:5000/create-user', {
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          fetchUserData();
        }
      })
})