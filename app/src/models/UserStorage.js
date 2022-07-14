'use strict';

// Promise: 수행하는 동작이 끝남과 동시에 상태를 알려주어 비동기 처리에 효과적이다.
const fs = require('fs').promises;

class UserStorage {
    // Code convention: 은닉화된 변수나 메서드는 클래스 최상단에 위치한다.
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        
        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;

        // reduce의 newUsers: fields 배열의 초기값, field: 다음 변수 대입
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
// 컨트롤러는 이러한 데이터를 갖고 있으면 안된다. 모델로 분리하여 모델에 데이터 저장
// # == private
// static: 클래스의 변수 선언 없이 클래스 자체에서 property나 method에 접근할 수 있게 하는 키워드
    // static #users = {
    //     id: ['yungit', 'random', 'pepe'],
    //     password: ['1234', '1111', '1234222'],
    //     name: ["윤준현", "랜덤", "페페"],
    // };

    // 여러 개의 arguments를 배열 fields라는 parameter로 받아온다.
    static getUsers(isAll, ...fields) {
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUsers(data, isAll, fields);
        })
        .catch(console.error);


    }

    static getUserInfo(id) {
        // const users = this.#users;
        // .then(): Promise 로직이 성공했을 때 실행 / .catch(): 실패했을 때 실행
        return fs.readFile("./src/databases/users.json")
        .then((data) => {
            return this.#getUserInfo(data, id);
        })
        .catch(console.error);
        // .catch((err) => console.error(err)); <- 함수를 실행할 때 파라미터를 그대로 실행한다면 생략 가능
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);
        if (users.id.includes(userInfo.id)) {
            throw '이미 존재하는 아이디입니다.';
        }
        users.id.push(userInfo.id);
        users.password.push(userInfo.password);
        users.name.push(userInfo.name);
        fs.writeFile('./src/databases/users.json', JSON.stringify(users));
        return { success: true };
        // // const users = this.#users;
        // users.id.push(userInfo.id);
        // users.password.push(userInfo.password);
        // users.name.push(userInfo.name);
        // return { success: true };
    }
}

module.exports = UserStorage;