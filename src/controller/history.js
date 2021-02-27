const {
    mListHistory,
    mTotal,
    mInsertHistory,
    mUpdateHistory
} = require('../model/history')

const { success, failed, notFound } = require('../helper/response')

module.exports = {
    listHistory: async (req, res)=>{
        try {
            const id = req.params.id
            const param = req.query.param ? req.query.param : 'created_at'
            const sort = req.query.sort ? req.query.sort : 'ASC'
            const limit = req.query.limit ? req.query.limit : 6
            const page = req.query.page ? req.query.page : 1
            const offset = page===1 ? 0 : (page-1)*limit
            const responseTotal = await mTotal(id) // count total page
            
            mListHistory(id, param, sort, offset, limit)
            .then((response)=>{
                const data = response
                const pagination = {
                    page: page,
                    limit: limit,
                    totalData: responseTotal[0].total,
                    totalPage: Math.ceil(responseTotal[0].total / limit)
                }
                if(response.length > 0){
                    success(res, data, pagination, 'Get all history success')
                }else{
                    notFound(res,"Data unavailable", data)
                }
            }).catch((err)=>{
                // failed(res, 'Internal server error', err)
                console.log(err)
            })
        } catch (error) {
            // failed(res, 'Internal server error', [])
            console.log(error)
        }   
    },
    insertHistory: (req, res)=>{
        try {
            const data = { 
                from_id: req.body.from_id,
                to_id: req.body.to_id,
                amount: req.body.amount,
                status: req.body.status,
                notes: req.body.notes
            }
            if(!data.from_id || !data.to_id || !data.amount || !data.status || !data.notes){
                failed(res, 'All textfield is required!', [])
            }else{
                mInsertHistory(data)
                .then((response)=>{
                    success(res, response, {}, 'Insert history success')
                }).catch((err)=>{
                    failed(res, 'All textfield is required!', [])
                })
            }
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    },
    updateHistory: (req, res)=>{
        try {
            const data = req.body
            const id = req.params.id
    
            mUpdateHistory(data, id)
            .then((response)=>{
                success(res, response, {}, 'Update history success')
            }).catch(()=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    }
}