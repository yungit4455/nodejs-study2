'use strict';

class UserStorage {
// 컨트롤러는 이러한 데이터를 갖고 있으면 안된다. 모델로 분리하여 모델에 데이터 저장
// # == private
// static: 클래스의 변수 선언 없이 클래스 자체에서 property나 method에 접근할 수 있게 하는 키워드
    static #users = {
        id: ['yungit', 'hannam', 'pepe'],
        password: ['1234', '1111', '1234222'],
        name: ["윤준현", "한남", "페페"],
    };

    // 여러 개의 arguments를 배열 fields라는 parameter로 받아온다.
    static getUsers(...fields) {
        const users = this.#users;
        // reduce의 newUsers: fields 배열의 초기값, field: 다음 변수 대입
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }
}

module.exports = UserStorage;