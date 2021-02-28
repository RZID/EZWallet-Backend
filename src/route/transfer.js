const express = require('express')
const Router = express.Router()

const { 
    transfer,
    transferSuccess,
    transferCancel,
    topUp
} = require('../controller/transfer')
const { authentication } = require('../helper/middleware/auth')

Router
    .post('/api/transfer/:id', authentication, transfer)
    .post('/api/transferSuccess/:id', authentication, transferSuccess)  // id history
    .post('/api/transferCancel/:id', authentication, transferCancel)    // id history
    .post('/api/topUp/:id', authentication, topUp)

module.exports= Router