const { mTransfer } = require('../model/transfer')
const { mDetailUser } = require('../model/users')
const { 
    mInsertHistory,
    mUpdateHistory,
    mDetailHistory,
    mDetailHistoryCancel
} = require('../model/history')
const { success, failed, notFound } = require('../helper/response')

module.exports = {
    transfer: async (req, res) => {
        try {
            const id = req.params.id // from_id
            const body = req.body //req body buat uang yg ditransfer
            const balance = await mDetailUser(id) //ngambil balance sebelum di update
            const amount = Number(balance[0].balance) - body.amount //balance yang bakal dimasukin/update ke balance user

            if( !body.to_id || !body.amount || !body.notes){
                failed(res, 'All textfield is required!', [])
            }else{
                if(balance[0].balance >= body.amount){
                    mTransfer(amount, id).then((response) => {
                        const data = { 
                            from_id: id,
                            to_id: req.body.to_id,
                            amount: req.body.amount,
                            status: 1,
                            notes: req.body.notes
                        }
                        mInsertHistory(data).then((response) => {
                            success(res, response, {}, 'Status pending, waiting for recipient confirmation')
                        }).catch((err) => {
                            failed(res, 'Internal server error', [])
                        })
                    }).catch((err) => {
                        failed(res, 'Internal serverrr error', [])
                    })
                }else{
                    failed(res, 'Check your balance', [])
<<<<<<< HEAD
                    // console.log(balance[0].balance)
                    // console.log(body.amount)
=======
>>>>>>> 8aea6888a97a1e4211f4f5a4615e87b137f856dc
                }
            }
        } catch(err) {
            failed(res, 'Internal Server Error', [])
        }
    },
    transferSuccess: async (req, res) => {
        try {
            const to_id = req.params.id // id penerima
            const balance = await mDetailUser(to_id)

            mDetailHistory(to_id).then((response)=>{
                const amount = Number(balance[0].balance) + Number(response[0].amount)
                const id_history = response[0].id
                const data = {
                    status: 2
                }
                mUpdateHistory(data, id_history).then((response) => {
                    mTransfer(amount, to_id).then((response) => {
                        success(res, response, {}, 'Transfer accepted')
                    }).catch((err) => {
                        failed(res, 'Internal server error', [])
                    })
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
            }).catch((err) => {
                failed(res, 'No pending transfer', [])
            })
        } catch(err) {
            failed(res, 'Internal Server Error', [])
        }
    },
    // cancel from receiver
    transferCancel: async (req, res) => {
        try {
            const to_id = req.params.id // id penerima
            const history = await mDetailHistory(to_id)
            const id_history = history[0].id
            const from_id = history[0].from_id
            const detail = await mDetailUser(from_id)
            const amount = Number(detail[0].balance) + Number(history[0].amount)
            const data = {
                status: 3
            }
            mUpdateHistory(data, id_history).then((response) => {
                mTransfer(amount, from_id).then((response) => {
                    success(res, response, {}, 'Transfer canceled')
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
            }).catch((err) => {
                failed(res, 'Internal server error', [])
            })
        } catch(err) {
            failed(res, 'No pending transfer', [])
        }
    },
    // cancel from sender
    transferCancelSender: async (req, res) => {
        try {
            const from_id = req.params.id // id pengirim
            const balance = await mDetailUser(from_id)

            mDetailHistoryCancel(from_id).then((response)=>{
                const amount = Number(balance[0].balance) + Number(response[0].amount)
                const id_history = response[0].id
                const data = {
                    status: 3
                }
                mUpdateHistory(data, id_history).then((response) => {
                    mTransfer(amount, from_id).then((response) => {
                        success(res, response, {}, 'Transfer canceled')
                    }).catch((err) => {
                        failed(res, 'Internal server error', [])
                    })
                }).catch((err) => {
                    failed(res, 'Internal server error', [])
                })
            }).catch((err) => {
                failed(res, 'No pending transfer', [])
            })
        } catch(err) {
            failed(res, 'Internal Server Error', [])
        }
    },
    topUp: async (req, res) => {
        try {
            const id = req.params.id
            const balance = await mDetailUser(id)
            const amount = Number(balance[0].balance) + Number(req.body.amount)
            
            if(!req.body.amount){
                failed(res, 'All field required', [])
            }else{
                mTransfer(amount, id).then((response) => {
                    const data = { 
                        from_id: 1,
                        to_id: id,
                        amount: req.body.amount,
                        status: 4,
                        notes: 'Top Up'
                    }
                    mInsertHistory(data).then((response) => {
                        success(res, response, {}, 'Top up success')
                    }).catch((err) => {
                        failed(res, 'Internal server error', [])
                    })
                }).catch((err) => {
                    failed(res, 'Internal serverrr error', [])
                })

            }
        } catch (error) {
            failed(res, 'Internal serverrr error', [])
        }
    }
}