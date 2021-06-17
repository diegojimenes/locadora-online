import express from 'express'
const router = express.Router()

router.post('/', (req, res) => res.send('oi'))
export default router