import { Router } from 'express'
import { getStats } from '../controllers/stats.controller.js'
import { protectRoute, verifyAdmin } from '../middleware/auth.middleware.js'

const statsRouter = Router()

statsRouter.get('/', protectRoute, verifyAdmin, getStats)

export default statsRouter