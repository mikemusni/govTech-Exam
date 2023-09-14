import express from 'express'
import { create, login, logout, profile } from '../controllers/user'
import { auth, guard } from '../middlewares/session'
import { createValidation, guardValidation, loginValidation } from '../middlewares/validation/user'

const router = express.Router()

router.post('/create', createValidation, create)
router.post('/login', loginValidation, login)
router.get('/auth', auth, profile)
router.post('/secure/auth', guardValidation, guard, profile)
router.get('/logout', auth, logout)

export default router
