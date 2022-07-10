'use strict';

const output = {
    home: (req, res) => {
        res.render('home/index');
    },
    
    login: (req, res) => {
        res.render('home/login');
    },
};

// req: 프론트엔드에서 전달한 요청(request)한 데이터를 담아두는 변수
const process = {
    login: (req, res) => {
        console.log(req.body);
    },
};

module.exports = {
    output,
    process,
};