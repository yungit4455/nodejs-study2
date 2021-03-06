'use strict';

const db = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserStorage {
    static getUserInfo(id) {
        // fs는 자체적으로 Promise를 지원하지만 mysql은 미지원이라 직접 만들어야 한다.
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?;';
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        return bcrypt.hash(userInfo.password, saltRounds).then((hash) => {
            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO users(id, name, password) VALUES(?, ?, ?);';
                db.query(query, [userInfo.id, userInfo.name, hash], (err) => {
                    if (err) reject(`${err}`);
                    else resolve({ success: true });
                });
            });
        });
    }
}

module.exports = UserStorage;