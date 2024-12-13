import { authCallback } from '../controllers/auth.controller.js'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/callback', authCallback)

export default authRouter