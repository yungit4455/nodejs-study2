'use strict';

const db = require('../config/db');

class UserStorage {
    static getUserInfo(id) {
        // fs는 자체적으로 Promise를 지원하지만 mysql은 미지원이라 직접 만들어야 한다.
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?;';
            db.query(query, [id], (err, data) => {
                if (err) reject(err);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users(id, name, password) VALUES(?, ?, ?);';
            db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;