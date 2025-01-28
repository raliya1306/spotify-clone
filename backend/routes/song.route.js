import { Router } from 'express'
import { getAllSongs, getMadeForYou, getRecommended, getTodayInMusic } from '../controllers/song.controller.js'
import { protectRoute, verifyAdmin } from '../middleware/auth.middleware.js'

const songRouter = Router()

// songRouter.use(protectRoute)

songRouter.get('/', verifyAdmin, getAllSongs)
songRouter.get('/made-for-you', getMadeForYou)
songRouter.get('/today-in-music', getTodayInMusic)
songRouter.get('/recommended', getRecommended)

export default songRouter