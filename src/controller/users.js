const bcrypt = require ('bcrypt')
const { 
    mRegister,
    mCheckEmail,
    mUpdateUser,
    mDetailUser
} = require ('../model/users')
const { success, failed, notFound } = require('../helper/response')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../helper/env')
const fs = require('fs')

module.exports = {
    login: (req, res) => {
        const body = req.body
        mCheckEmail(body.email).then( async (response) => {
            if(response.length === 1){
                const checkPassword = await bcrypt.compare(body.password, response[0].password)
                if(checkPassword){
                    const dataUser = {  // data to be encrypted by JWT
                        id: response[0].id,
                        email: response[0].email
                    }
                    const token = jwt.sign(dataUser, JWT_SECRET)
                    res.json({
                        message: 'Login success',
                        token,     // same property and value
                        name: response[0].name,
                        id: response[0].id
                    })
                }else{
                    failed(res, 'Login failed, please check your password', {})
                }
            }else{
                notFound(res,"Email not found", {})
            }
        }).catch((err) => {
            if(!body.email || !body.password){
                failed(res, 'Please input all field', err)
            }else{
                failed(res, 'Internal server error', err)
            }
        })
    },
    register: async(req, res) => {
        const body = req.body
        const data = {
            name: body.name,
            email: body.email,
            password: body.password,
            image: 'default.png',
            pin: '',
            phone: ''
        }
        mCheckEmail(data.email).then( async (response) => {
            if(response.length >= 1){
                failed(res, 'Email has been registered', {})
            }else{
                // use salt to add a unique code in password
                const salt = await bcrypt.genSalt(10) // 10 to make code more unique (optional)
                const password = await bcrypt.hash(body.password, salt)
                const user = {
                    name: data.name,
                    email: data.email,
                    password,
                    image: data.image,
                    pin: data.pin,
                    phone: data.phone,
                }
                if( !user.name || !user.email || !user.password ){
                    failed(res, 'All textfield is required!', [])
                }else{
                    mRegister(user).then((response) => {
                        success(res, {}, {}, 'Register success')
                    }).catch((err) => {
                        failed(res, 'Internal server error', err)
                    })
                }
            }
        }).catch((err) => {
            failed(res, 'Internal server error', err)
        })
    },
    updateUser: async (req, res) => {
        try {
            const data = req.body
            const id = req.params.id
            const detail = await mDetailUser(id)

            if(data.pin){
                const salt = await bcrypt.genSalt(10)
                data.pin = await bcrypt.hash(data.pin, salt)
            }
            if(req.file){
                if(detail[0].image === 'default.png'){
                    data.image = req.file.filename
                    mUpdateUser(data, id)
                    .then((response)=>{
                        success(res, response, {}, 'Update profile success')
                    }).catch((err)=>{
                        // failed(res, 'Internal server error', [])
                        console.log(err)
                    }) 
                }else{
                    data.image = req.file.filename
                    const path = `./public/images/${detail[0].image}`
                    fs.unlinkSync(path)
                    mUpdateUser(data, id)
                    .then((response)=>{
                        success(res, response, {}, 'Update profile success')
                    }).catch((err)=>{
                        failed(res, 'Internal server error', [])
                    }) 
                }
            }else{
                mUpdateUser(data, id)
                .then((response)=>{
                    success(res, response, {}, 'Update profile success')
                }).catch((err)=>{
                    failed(res, 'Internal server error', [])
                })
            }
        } catch (error) {
            // failed(res, 'Internal server error', [])
            console.log(error)
        }
    },
    loginPIN: (req, res) => {
        const body = req.body
        const id = req.params.id
        mDetailUser(id).then( async (response) => {
            if(response.length === 1){
                const checkPIN = await bcrypt.compare(body.pin, response[0].pin)
                if(checkPIN){
                    success(res, {}, {}, 'Login success')
                }else{
                    failed(res, 'Login failed, please check your PIN number', {})
                }
            }
        }).catch((err) => {
            if(!body.pin){
                failed(res, 'Please input all field', err)
            }else{
                failed(res, 'Internal server error', err)
            }
        })
    }
}