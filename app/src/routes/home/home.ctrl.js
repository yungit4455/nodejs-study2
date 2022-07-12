'use strict';

const UserStorage = require('../../models/UserStorage');

const output = {
    home: (req, res) => {
        res.render('home/index');
    },
    
    login: (req, res) => {
        res.render('home/login');
    },
};

// req: 프론트엔드에서 전달한 요청(request)의 데이터를 담아두는 변수
const process = {
    login: (req, res) => {
        const id = req.body.id;
        const password = req.body.password;

        const users = UserStorage.getUsers('id', 'password');

        const response = {};
        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.password[idx] === password) {
                response.success = true;
                return res.json(response);
            }
        }

        response.success = false;
        response.msg = '로그인에 실패하였습니다.';
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};