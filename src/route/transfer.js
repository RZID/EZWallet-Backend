const express = require('express')
const Router = express.Router()

const { transfer } = require('../controller/transfer')

Router
    .post('/api/transfer/:id', transfer)

module.exports= Router