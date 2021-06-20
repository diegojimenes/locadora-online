import users from "../models/users"
import { v4 as uuid } from 'uuid'

export class UserController {
    private model
    constructor(connection) {
        this.model = users(connection)
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
            const usr = await this.model.create({ id, name, email, password })
            return res.status(200).json(usr)
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

