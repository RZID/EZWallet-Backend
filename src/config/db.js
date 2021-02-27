const mysql = require('mysql2')
const { DB_HOST, DB_USER, DB_PASSWORD } = require('../helper/env')

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'wallet'
});

module.exports = connection