const { mTransfer } = require('../model/transfer')
const { mDetailUser } = require('../model/users')
const { mInsertHistory } = require('../model/history')

module.exports = {
    transfer: async (req, res) => {
        try {
            const id = req.params.id //id param
            const body = req.body //req body buat uang yg ditransfer
            const balance = await mDetailUser(id) //ngambil balance sebelum di update
            const amount = Number(balance[0].balance) - body.amount //balance yang bakal dimasukin/update ke balance user
            mTransfer(amount, id).then((response) => {
                const data = { 
                    from_id: req.body.from_id,
                    to_id: req.body.to_id,
                    amount: req.body.amount,
                    status: req.body.status,
                    notes: req.body.notes
                }
                mInsertHistory(data).then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        } catch(err) {

        }
    }
}