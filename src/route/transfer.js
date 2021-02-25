const express = require('express')
const Router = express.Router()

const { 
    transfer,
    transferSuccess,
    transferCancel,
    transferCancelSender
} = require('../controller/transfer')

Router
    .post('/api/transfer/:id', transfer)
    .post('/api/transferSuccess/:id', transferSuccess)
    .post('/api/transferCancel/:id', transferCancel)
    .post('/api/transferCancelSender/:id', transferCancelSender)

module.exports= Router