const { mTransfer } = require('../model/transfer')
const { mDetailUser } = require('../model/users')
const { mInsertHistory } = require('../model/history')
const { success, failed, notFound } = require('../helper/response')

module.exports = {
    transfer: async (req, res) => {
        try {
            const id = req.params.id //id param
            const body = req.body //req body buat uang yg ditransfer
            const balance = await mDetailUser(id) //ngambil balance sebelum di update
            const amount = Number(balance[0].balance) - body.amount //balance yang bakal dimasukin/update ke balance user

            if(!body.from_id || !body.to_id || !body.amount || !body.status || !body.notes){
                failed(res, 'All textfield is required!', [])
            }

            if(balance[0].balance > body.amount){
                mTransfer(amount, id).then((response) => {
                    const data = { 
                        from_id: req.body.from_id,
                        to_id: req.body.to_id,
                        amount: req.body.amount,
                        status: req.body.status,
                        notes: req.body.notes
                    }.catch((err) => {
                        // failed(res, 'Internal server error', [])
                        console.log(err)
                    })
                    mInsertHistory(data).then((response) => {
                        success(res, response, {}, 'Waiting for recipient confirmation')
                    }).catch((err) => {
                        failed(res, 'Internal server error', [])
                    })
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
            }else{
                failed(res, 'Check your balance', [])
            }
        } catch(err) {

        }
    }
}