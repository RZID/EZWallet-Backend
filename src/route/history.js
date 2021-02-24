const express = require('express')
const Router = express.Router()

const { 
    listHistory,
    insertHistory
} = require('../controller/history')
const { authentication } = require('../helper/middleware/auth')

Router
    .get('/api/history/:id', authentication, listHistory)
    .post('/api/history', authentication, insertHistory)

module.exports= Router