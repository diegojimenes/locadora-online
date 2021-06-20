require('dotenv/config')

module.exports = {
    dialect: 'postgres',
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
    define: {
        timestamps: true,
    }
}