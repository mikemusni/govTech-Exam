import express from 'express'
import { profile, register } from '../controllers/user'
import { govSgAuth } from '../middlewares/gov-sg-auth'
import { registerValidation } from '../middlewares/validation/user'

const router = express.Router()

router.post('/register', govSgAuth, registerValidation, register)
router.get('/profile', govSgAuth, profile)

export default router
