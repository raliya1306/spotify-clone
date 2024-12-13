import { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } from '../controllers/admin.controller.js'
import { protectRoute, verifyAdmin } from '../middleware/auth.middleware.js'
import { Router } from 'express'

const adminRouter = Router()

adminRouter.use(protectRoute, verifyAdmin)

adminRouter.get('/check', checkAdmin)

adminRouter.post('/songs', createSong)
adminRouter.delete('/songs/:id', deleteSong)
adminRouter.post('/albums', createAlbum)
adminRouter.delete('/albums/:id', deleteAlbum)

export default adminRouter