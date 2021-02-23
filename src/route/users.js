const express = require('express')
const Router = express.Router()

const { 
    login, 
    register,
    updateUser,
    loginPIN
} = require('../controller/users')
const { authentication } = require('../helper/middleware/auth')
const singleUpload = require('../helper/middleware/upload')

Router
    .post('/api/login', login)
    .post('/api/register', register)
    .patch('/api/user/:id', authentication, singleUpload, updateUser)
    .post('/api/loginPIN/:id', authentication, loginPIN)

module.exports= Router