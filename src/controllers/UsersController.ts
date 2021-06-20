import users from "../models/users"
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
export class UserController {
    private model
    constructor(connection) {
        this.model = users(connection)
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body
            const usr = await this.model.findOne({
                where: {
                    email
                }
            })
            const match = await bcrypt.compare(password, usr.password)
            if (match) {
                const token = jwt.sign({ id: usr.id, exp: Math.floor(Date.now() / 1000) + (60 * 600) }, process.env.JWTSECRETE)
                return res.status(200).json({
                    user: usr,
                    token
                })
            } else {
                throw 'invalid password'
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    get = async (req, res) => {
        try {
            const { id } = req.body
            const usr = await this.model.findByPk(id);
            return res.status(200).json(usr)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    index = async (_, res) => {
        try {
            const usrs = await this.model.findAll();
            return res.status(200).json(usrs)
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    store = async (req, res) => {
        try {
            const id = uuid()
            const { name, email, password } = req.body
            const token = jwt.sign({ id, exp: Math.floor(Date.now() / 1000) + (60 * 600) }, process.env.JWTSECRETE)
            const hash = await bcrypt.hash(password, 10)
            const usr = await this.model.create({ id, name, email, password: hash })
            return res.status(200).json({
                user: usr,
                token
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    update = async (req, res) => {
        try {
            const { id, name, email } = req.body
            const usr = await this.model.update({
                name,
                email
            }, {
                where: { id: id }
            })

            return res.status(200).json({
                message: 'the user has been successfully edited'
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    delete = async (req, res) => {
        try {
            const { id } = req.body
            await this.model.destroy({
                where: { id: id }
            })

            return res.status(200).json({
                message: 'the user has been successfully deleted'
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

