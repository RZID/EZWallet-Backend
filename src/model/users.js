const connection = require('../config/db')

module.exports = {
    mLogin: () => {
        return
    },
    mCheckEmail: (email) => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    mRegister: (dataUser) => {
        return new Promise ((resolve, reject) => {
            connection.query(`INSERT INTO users SET ?`, dataUser, (err, result) => {
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    },
    mDetailUser: (id) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    },
    mUpdateUser: (data, id) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`UPDATE users SET ? WHERE id=?`, [data, id] , (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}