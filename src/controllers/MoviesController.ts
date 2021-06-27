import movies from "../models/movie"
import { v4 as uuid } from 'uuid'
import 'dotenv/config'
export class MovieController {
    private model
    constructor(connection) {
        this.model = movies(connection)
    }
    /**
     * @swagger
     *
     * /getMovie:
     *   get:
     *     summary: find one movie by id
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: movie data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/user'
     *       500:
     *          description: movie not found
    */
    get = async (req, res) => {
        try {
            const { id } = req.body
            let movie = await this.model.findByPk(id);
            return res.status(200).json(movie)
        } catch (err) {
            return res.status(500).json({
                message: 'movie not found'
            })
        }
    }
    /**
     * @swagger
     *
     * /listMovie:
     *   get:
     *     summary: list all movie created
     *       - application/json
     *     responses:
     *       200:
     *         description: All data of movie.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/user'
     *       500:
     *          description: no movie found
    */
    index = async (_, res) => {
        try {
            const movie = await this.model.findAll();
            return res.status(200).json(movie)
        } catch (err) {
            return res.status(500).json({
                message: 'no movie found'
            })
        }
    }
    /**
     * @swagger
     *
     * /createMovie:
     *   post:
     *     summary: create a movie
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
     *         description: movie data.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/user'
    */
    store = async (req, res) => {
        try {
            const id = uuid()
            const { title, director, price, inStock, rented } = req.body
            let movie = await this.model.create({ id, title, director, price, inStock, rented })
            return res.status(200).json({
                movie: movie
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
    /**
     * @swagger
     *
     * /updateMovie:
     *   put:
     *     summary: update movie data
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
     *       - name: title
     *         in: body
     *         required: true
     *         type: string
     *       - name: director
     *         in: body
     *         required: true
     *         type: string
     *       - name: price
     *         in: body
     *         required: true
     *         type: integer
     *       - name: inStock
     *         in: body
     *         required: true
     *         type: integer
     *       - name: rented
     *         in: body
     *         required: true
     *         type: integer
     *     responses:
     *       200:
     *         description: the movie has been successfully edited.
    */
    update = async (req, res) => {
        try {
            const { id, name, title, director, price, inStock, rented } = req.body
            await this.model.update({
                name, 
                title, 
                director, 
                price, 
                inStock, 
                rented
            }, {
                where: { id: id }
            })

            return res.status(200).json({
                message: 'the movie has been successfully edited'
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
    /**
     * @swagger
     *
     * /deleteMovie:
     *   post:
     *     summary: delete one movie
     *       - application/json
     *     parameters:
     *       - name: id
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: the movie has been successfully deleted.
    */
    delete = async (req, res) => {
        try {
            const { id } = req.body
            await this.model.destroy({
                where: { id: id }
            })

            return res.status(200).json({
                message: 'the movie has been successfully deleted'
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

