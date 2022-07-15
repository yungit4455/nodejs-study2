'use strict';

const UserStorage = require('./UserStorage');

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        // await: Promise를 반환하는 곳에서만 사용할 수 있다. 비동기적인 특성을 갖기 때문에 Promise를 받는 곳에서는
        // await을 사용해야 한다. .then()으로 접근할 수도 있으나 가독성이 좋아 await을 사용했다.
        // <Pending>: Promise 반환에 시간이 오래걸리기 때문에 해당 함수는 await으로 대기를 해야한다.
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id);
    
            // id: DB에 저장되어있는 id, body.id: Client가 입력한 id
            if (user) {
                if (user.id === client.id && user.password === client.password) {
                    return { success: true };
                }
                return { success: false, msg: '비밀번호가 틀렸습니다.' };
            }
            return { success: false, msg: '존재하지 않는 아이디입니다.' };
        } catch (err) {
            return { success: false, msg: err };
        }
    }

   async register() {
        const client = this.body;
        // async await의 에러처리는 try catch를 사용한다.
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;
