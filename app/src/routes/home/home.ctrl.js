'use strict';

const users = {
    id: ['yungit', 'hannam', 'pepe'],
    password: ['6974', '1111', '1234222'],
};

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

        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.password[idx] === password) {
                return res.json({
                    success: true,
                });
            }
        }

        return res.json({
            success: false,
            msg: '로그인에 실패하였습니다.',
        });
    },
};

module.exports = {
    output,
    process,
};