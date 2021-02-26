const express = require('express')
const Router = express.Router()

const { 
    listHistory,
    insertHistory,
    updateHistory
} = require('../controller/history')
const { authentication } = require('../helper/middleware/auth')

Router
    .get('/api/history/:id', authentication, listHistory)
    .post('/api/history', authentication, insertHistory)
    .patch('/api/history/:id', authentication, updateHistory)

module.exports= Router