const conn = require('../config/db')

module.exports = {
    mTransfer: (amount, id) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE users SET balance = '${amount}' WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            }) 
        })      
    }
}