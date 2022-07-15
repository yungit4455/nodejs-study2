'use strict';

// 모듈
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

// 라우팅
const home = require('./src/routes/home');

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
// URL을 통해 전달되는 데이터에 한글, 공백 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(express.urlencoded({ extended: true }));

app.use('/', home); // use -> middleware를 등록하는 method

module.exports = app;