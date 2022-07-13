'use strict';

const id = document.querySelector('#id');
const name = document.querySelector('#name');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const registerBtn = document.querySelector('button');

registerBtn.addEventListener('click', register);

function register() {
    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = '/login';
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('회원가입 도중 에러 발생!'));
    });
}