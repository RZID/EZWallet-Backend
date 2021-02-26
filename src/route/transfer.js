const express = require('express')
const Router = express.Router()

const { 
    transfer,
    transferSuccess,
    transferCancel,
    transferCancelSender,
    topUp
} = require('../controller/transfer')
const { authentication } = require('../helper/middleware/auth')

Router
    .post('/api/transfer/:id', authentication, transfer)
    .post('/api/transferSuccess/:id', authentication, transferSuccess)
    .post('/api/transferCancel/:id', authentication, transferCancel)
    .post('/api/transferCancelSender/:id', authentication, transferCancelSender)
    .post('/api/topUp/:id', authentication, topUp)

module.exports= Router