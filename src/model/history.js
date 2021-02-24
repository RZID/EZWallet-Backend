const connection = require('../config/db')

module.exports = {
    mListHistory: () => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT history.to_id AS id, users.image as image, users.name as name, history.amount, status, notes, UNIX_TIMESTAMP(created_at) AS time FROM history 
            LEFT JOIN users ON history.to_id = users.id
            WHERE ${searchParams} LIKE '%${search}%' ORDER BY ${param} ${sort}
            LIMIT ${offset}, ${limit}`,(err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    }
}