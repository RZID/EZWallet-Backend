const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./src/route/users')
const historyRoute = require('./src/route/history')

const { PORT } = require('./src/helper/env')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(userRoute)
app.use(historyRoute)
// open route for public image
app.use('/images', express.static('./public/images'))

app.listen(PORT, () => {   
    console.log(`Server running on PORT ${PORT}`)
})      