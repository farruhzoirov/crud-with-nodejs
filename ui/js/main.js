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
const modalBackdrop= document.querySelector('.modal-backdrop');

let newUserId;
const fetchDataHandler = () => {
  fetch('http://localhost:5000/get-users', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
  })
      .then(res => res.json())
      .then(res => {
        let responseData = res;
        tBody.innerHTML = '';
        responseData.users.forEach((item) => {
          tBody.innerHTML += `
              <tr>
                  <td>${item.name}</td>
                  <td>${item.phone}</td>
                  <td>${item.tariff}</td>
                  <td>
                     <button class="btn btn-primary" onclick="newUser(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>
                     <button onclick="deleteUser(${item.id})" class="delete-btn btn btn-danger">Delete</button>
                  </td>
              </tr>
           `
        })
      });
}

fetchDataHandler();

userCreateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const body = {
    name: nameInput.value,
    phone: phoneNumber.value,
    tariff: selectBox.value,
  }

  fetch('http://localhost:5000/create-user', {
    headers: {
      'Content-type': 'application/json; charset = utf-8'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          fetchDataHandler();
        }
      })
})

function newUser (id) {
  newUserId = parseInt(id);
  console.log(newUserId)
}

// Event listener for the form submission
modalUserChangeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Gather data from the form
  const updatingBody = {
    id: newUserId,
    name: modalNameInput.value,
    phone: modalPhoneNumber.value,
    tariff: modalSelectBox.value
  };
  console.log(updatingBody)

  // Send a POST request to the server
  fetch('http://localhost:5000/update-user-data', {
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    method: 'POST',
    body: JSON.stringify(updatingBody)
  })
      .then(res => res.json())
      .then(res => {
         if (res.ok) {
           fetchDataHandler();
         }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
      });
  
  modalNameInput.value = '';
  modalPhoneNumber.value = '';
  modalSelectBox.value = ''
});



function deleteUser(id) {
  fetch('http://localhost:5000/delete-user', {
    headers: {
      'Content-type': 'application/json; charset = utf-8'
    },
    method: 'POST',
    body: JSON.stringify({id})
  })
      .then(res => res.json())
      .then(res => {
        if (res.ok) {
          fetchDataHandler()
        }
      })
}



