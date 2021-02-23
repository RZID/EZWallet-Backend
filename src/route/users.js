const express = require('express')
const Router = express.Router()

const { 
    login, 
    register,
    updateUser
} = require('../controller/users')
const { authentication } = require('../helper/middleware/auth')
const singleUpload = require('../helper/middleware/upload')

Router
    .post('/api/login', login)
    .post('/api/register', register)
    // .patch('/api/user/:id', singleUpload, authentication, updateUser)

module.exports= Router