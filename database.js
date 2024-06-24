const mysql = require('mysql2')

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hr_app'
})

module.exports = database