import 'dotenv/config'
import { Sequelize } from 'sequelize'

export class connection {
    public sequelize
    constructor() {
        this.sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASS, {
            host: process.env.HOST,
            dialect: 'postgres'
        })
    }

    async testConnection() {
        try {
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }
}