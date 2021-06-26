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
    /**
     * @swagger
     *
     * /login:
     *   post:
     *     summary: email and password login
     *       - application/json
     *     parameters:
     *       - name: email
     *         in: body
     *         required: true
     *         type: string
     *       - name: password
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: user data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Login'
     *       401:
     *          description: invalid password
     *       500:
     *          description: User not found
    */
    login = async (req, res) => {
        try {
            const { email, password } = req.body
            const usr = await this.model.findOne({
                where: {
                    email
                }
            })

            if(!usr) throw {
                err: 'User not found',
                status: 500
            }

            const match = await bcrypt.compare(password, usr.password)
            if (match) {
                const token = jwt.sign({ id: usr.id, exp: Math.floor(Date.now() / 1000) + (60 * 600) }, process.env.JWTSECRETE)
                let user = usr
                delete user.password
                return res.status(200).json({
                    user: usr,
                    token
                })
            } else {
                throw {
                    err: 'invalid password',
                    status: 403
                }
            }
        } catch (error) {
            return res.status(error.status || 500).json(error.err || error)
        }
    }
    /**
     * @swagger
     *
     * /getUser:
     *   get:
     *     summary: find one user by id
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: user data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/user'
     *       500:
     *          description: User not found
    */
    get = async (req, res) => {
        try {
            const { id } = req.body
            let usr = await this.model.findByPk(id);
            delete usr.password
            return res.status(200).json(usr)
        } catch (err) {
            return res.status(500).json({
                message: 'user not found'
            })
        }
    }
    /**
     * @swagger
     *
     * /listUsers:
     *   get:
     *     summary: list all users created
     *       - application/json
     *     responses:
     *       200:
     *         description: All data of users.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/user'
     *       500:
     *          description: no users found
    */
    index = async (_, res) => {
        try {
            const usrs = await this.model.findAll();
            return res.status(200).json(usrs)
        } catch (err) {
            return res.status(500).json({
                message: 'no users found'
            })
        }
    }
    /**
     * @swagger
     *
     * /createUser:
     *   post:
     *     summary: create a user
     *       - application/json
     *     parameters:
     *       - name: name
     *         in: body
     *         required: true
     *         type: string
     *       - name: email
     *         in: body
     *         required: true
     *         type: string
     *       - name: password
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: user data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/user'
     *       500:
     *          description: User not found
    */
    store = async (req, res) => {
        try {
            const id = uuid()
            const { name, email, password } = req.body
            const token = jwt.sign({ id, exp: Math.floor(Date.now() / 1000) + (60 * 600) }, process.env.JWTSECRETE)
            const hash = await bcrypt.hash(password, 10)
            let usr = await this.model.create({ id, name, email, password: hash })
            delete usr.password
            return res.status(200).json({
                user: usr,
                token
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
    /**
     * @swagger
     *
     * /updateUser:
     *   put:
     *     summary: update user data
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: body
     *         required: true
     *         type: string
     *       - name: name
     *         in: body
     *         required: true
     *         type: string
     *       - name: email
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: the user has been successfully edited.
    */
    update = async (req, res) => {
        try {
            const { id, name, email } = req.body
            await this.model.update({
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
    /**
     * @swagger
     *
     * /deleteUser:
     *   post:
     *     summary: delete one user
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: the user has been successfully deleted.
    */
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

