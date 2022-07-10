'use strict';

// 모듈
const express = require('express');
const app = express();

const PORT = 3000;
// 라우팅
const home = require('./src/routes/home');

// 앱 세팅
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', home); // use -> middleware 등록하는 method


module.exports = app;