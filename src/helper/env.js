require('dotenv').config()

module.exports = {
    DB_HOST: process.env.DB_HOST,
    PORT: process.env.PORT,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET
}