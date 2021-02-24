const express = require('express')
const Router = express.Router()

const { 
    login, 
    register,
    updateUser,
    loginPIN,
    detailUser,
    listUser
} = require('../controller/users')
const { authentication } = require('../helper/middleware/auth')
const singleUpload = require('../helper/middleware/upload')

Router
    .get('/api/allUser', authentication, listUser)
    .get('/api/user/:id', authentication, detailUser)
    .post('/api/login', login)
    .post('/api/register', register)
    .patch('/api/user/:id', authentication, singleUpload, updateUser)
    .post('/api/loginPIN/:id', authentication, loginPIN)

module.exports= Router