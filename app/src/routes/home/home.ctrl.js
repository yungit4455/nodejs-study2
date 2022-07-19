'use strict';

const logger = require('../../config/logger');
const User = require('../../models/User');

const output = {
    home: (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`);
        res.render('home/index');
    },
    
    login: (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render('home/login');
    },

    register: (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render('home/register');
    }
};

// req: 프론트엔드에서 전달한 요청(request)의 데이터를 담아두는 변수
const process = {
    // async await 함수는 자체적으로 Promise를 반환한다. 그러므로 await을 적용할 수 있다.
     login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: 'POST',
            path: '/login',
            status: response.err ? 400 : 200, // response.err가 존재하면(에러가 발생했다면) 400, 아니면 200
        };

        log(response, url);
        return res.status(url.status).json(response);
    },
    
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();

        const url = {
            method: 'POST',
            path: '/register',
            status: response.err ? 409 : 201, // 201: 새로운 데이터 생성을 성공함 / 409: Conflict 원래는 500번대를 반환하는게 맞음
        };

        log(response, url);
        return res.status(url.status).json(response);
    },
};

module.exports = {
    output,
    process,
};

const log = (response, url) => {
    if (response.err) {
        logger.error(
            `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}`
        );
    } else {
        logger.info(
            `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${
                response.msg || ''}`
        );
    }
};