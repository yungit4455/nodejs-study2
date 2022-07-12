'use strict';

const id = document.querySelector('#id');
const password = document.querySelector('#password');
const loginBtn = document.querySelector('button');

loginBtn.addEventListener('click', login);

function login() {
    const req = {
        id: id.value,
        password: password.value,
    };
    // 객체 그대로 전송, JSON 포맷으로 전송 차이: JSON은 모든 부분이 문자열로 감싸여있다.
    // console.log(req, JSON.stringify(req));
    // body를 서버에 전달할 때는 POST 방식으로 전달해야 한다.
    // 전달하는 데이터가 json임을 헤더로 전달해야 한다.
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then(console.log);
    // then((res) => console.log(res)); 와 같다. 파라미터로 넘긴 값을 어떠한 함수 안의 파라미터로
    // 다시 넘길 경우 생략할 수 있다.
}