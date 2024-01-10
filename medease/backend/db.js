const mysql = require('mysql2');
const config = require('dotenv');

const connection = () => {
    config.config();

    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    return mysql.createPool({
        host: "localhost",//DB_HOST,
        user: "root",//DB_USER,
        password: "", //DB_PASSWORD,
        database: "medease"//DB_NAME,
    });
};

module.exports = connection().promise()