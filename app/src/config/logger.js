'use strict';

const { createLogger, transports, format  } = require('winston');
const { combine, timestamp, simple, colorize, printf, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file: combine(
        label({
            label: '백엔드 맛보기',
        }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss',
        }),
        printFormat,
        ),
        
    console: combine(
        // 파일에 출력할 때는 색은 출력하지 않는다.
        colorize(),
        simple(),
    ),
};

const opts = {
    file: new transports.File({
        filename: 'access.log',
        dirname: './logs',
        level: 'info',
        format: printLogFormat.file,
    }),

    console: new transports.Console({
        level: 'info',
        format: printLogFormat.console,
    }),
}

// 서비스 중인 서버는 파일로만 로그 관리, 개발 중에는 콘솔에도 출력
const logger = createLogger({
    transports: [opts.file],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(opts.console);
}

logger.stream = {
    write: (message) => logger.info(message),
}

module.exports = logger;