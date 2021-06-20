import express from 'express'
import { connection } from '../db/connection'
const router = express.Router()
const db = new connection()
router.post('/', (req, res) => res.send('oi'))
export default router