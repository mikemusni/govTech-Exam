import express from 'express'
import { getAllAgency } from '../controllers/agency'

const router = express.Router()

router.get('/', getAllAgency)

export default router
