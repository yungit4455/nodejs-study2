'use strict';

class UserStorage {
// 컨트롤러는 이러한 데이터를 갖고 있으면 안된다. 모델로 분리하여 모델에 데이터 저장
    static #users = {
        id: ['yungit', 'hannam', 'pepe'],
        password: ['1234', '1111', '1234222'],
        name: ["윤준현", "한남", "페페"],
    };

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
}

module.exports = UserStorage;