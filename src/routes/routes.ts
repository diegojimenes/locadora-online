import express from 'express'
import { MovieController } from '../controllers/MoviesController'
import { UserController } from '../controllers/UsersController'
import { connection } from '../db/connection'
const router = express.Router()
const db = new connection()
db.testConnection()

const userController = new UserController(db.sequelize)
const movieController = new MovieController(db.sequelize)
// user routes
router.post('/createUser', userController.store)
router.get('/listUsers', userController.index)
router.put('/updateUser', userController.update)
router.post('/deleteUser', userController.delete)
router.get('/getUser', userController.get)
router.get('/login', userController.login)
// movie routes
router.post('/createMovie', movieController.store)
router.get('/listMovie', movieController.index)
router.put('/updateMovie', movieController.update)
router.post('/deleteMovie', movieController.delete)
router.get('/getMovie', movieController.get)
export default router