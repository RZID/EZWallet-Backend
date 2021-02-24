const { reject } = require('lodash')
const connection = require('../config/db')

module.exports = {
    mListUsers: () => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM history 
            LEFT JOIN users ON history.to_id = users.id
            `)
        })
    }
}