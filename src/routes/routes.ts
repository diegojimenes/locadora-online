import express from 'express'
import { UserController } from '../controllers/UsersController'
import { connection } from '../db/connection'
const router = express.Router()
const db = new connection()
db.testConnection()
const userController = new UserController(db.sequelize)
router.post('/createUser', userController.store)
router.get('/listUsers', userController.index)
router.put('/updateUser', userController.update)
router.post('/deleteUser', userController.delete)
router.get('/getUser', userController.get)
export default router