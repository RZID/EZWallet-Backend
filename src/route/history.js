const express = require('express')
const Router = express.Router()

const { 
    listHistory
} = require('../controller/history')
const { authentication } = require('../helper/middleware/auth')

Router
    .get('/api/history/:id', authentication, listHistory)

module.exports= Router