'use strict';

const UserStorage = require('./UserStorage');

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        // await: Promise를 반환하는 곳에서만 사용할 수 있다. 비동기적인 특성을 갖기 때문에 Promise를 받는 곳에서는
        // await을 사용해야 한다. .then()으로 접근할 수도 있으나 가독성이 좋아 await을 사용했다.
        // <Pending>: Promise 반환에 시간이 오래걸리기 때문에 해당 함수는 await으로 대기를 해야한다.
        const { id, password } = await UserStorage.getUserInfo(client.id);

        // id: DB에 저장되어있는 id, body.id: Client가 입력한 id
        if (id) {
            if (id === client.id && password === client.password) {
                return { success: true };
            }
            return { success: false, msg: '비밀번호가 틀렸습니다.' };
        }
        return { success: false, msg: '존재하지 않는 아이디입니다.' };
    }

    register() {
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }
}

module.exports = User;
