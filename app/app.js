'use strict';

// 모듈
const express = require('express');
const dotenv = require('dotenv');
// const morgan = require('morgan');
// const logger = require('./src/config/logger');

const app = express();
dotenv.config();

const accessLogStream = require('./src/config/log'); // 로그 관리: morgan
// const logger = require('./src/config/logger'); // 로그 관리: winston

// 라우팅
const home = require('./src/routes/home');


// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
// URL을 통해 전달되는 데이터에 한글, 공백 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('tiny', { stream: logger.stream })); morgan + winston 같이 사용하는 방법
// app.use(morgan('dev')); // 콘솔에 출력하는 로그
// app.use(morgan('common', { stream: accessLogStream })); // 파일에 저장하는 로그


app.use('/', home); // use -> middleware를 등록하는 method

module.exports = app;