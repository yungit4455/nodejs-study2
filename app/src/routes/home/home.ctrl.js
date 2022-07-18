'use strict';

const logger = require('../../config/logger');
const User = require('../../models/User');

const output = {
    home: (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render('home/index');
    },
    
    login: (req, res) => {
        logger.info(`GET /login 200 "로그인 화면으로 이동"`);
        res.render('home/login');
    },

    register: (req, res) => {
        logger.info(`GET /register 200 "회원가입 화면으로 이동"`);
        res.render('home/register');
    }
};

// req: 프론트엔드에서 전달한 요청(request)의 데이터를 담아두는 변수
const process = {
    // async await 함수는 자체적으로 Promise를 반환한다. 그러므로 await을 적용할 수 있다.
     login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        if (response.err)
            logger.error(`POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`);
        else
            logger.info(
                `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
            );
        return res.json(response);
    },
    
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if (response.err)
            logger.error(`POST /register 200 Response: "success: ${response.success}, msg: ${response.err}"`);
        else
            logger.info(
                `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
            );
        return res.json(response);
    },
};

module.exports = {
    output,
    process,
};