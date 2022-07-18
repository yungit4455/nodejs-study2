'use strict';

const id = document.querySelector('#id');
const name = document.querySelector('#name');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const registerForm = document.querySelector('.register-form');

registerForm.addEventListener('submit', register);

function register(event) {
    event.preventDefault();
    if (password.value !== confirmPassword.value) {
        return alert('비밀번호가 일치하지 않습니다.');
    }

    const req = {
        id: id.value,
        name: name.value,
        password: password.value,
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
            if (res.err) return alert(res.err);
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('회원가입 도중 에러 발생!'));
    });
}