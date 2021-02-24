const connection = require('../config/db')

module.exports = {
    mListHistory: (id, searchParams, search, param, sort ,offset, limit) => {
        return new Promise ((resolve, reject) => {
            connection.query(`SELECT history.from_id as from_id, history.to_id AS to_id, users.image as image, users.name as name, history.amount, status, notes, UNIX_TIMESTAMP(created_at) AS time FROM history 
            LEFT JOIN users ON history.to_id = users.id
            WHERE history.from_id = ${id} AND ${searchParams} LIKE '%${search}%' ORDER BY ${param} ${sort}
            LIMIT ${offset}, ${limit}
            `,(err, result) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    mTotal: (id, searchParams, search) => {
        return new Promise ((resolve, reject)=>{
            connection.query(`SELECT COUNT(*) as total FROM history
            LEFT JOIN users ON history.to_id = users.id
            WHERE from_id = ${id} AND ${searchParams} LIKE '%${search}%'`
            ,(err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
}