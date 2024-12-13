import { Router } from 'express'
import { getAlbum, getAllAlbums } from '../controllers/album.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'

const albumRouter = Router()

albumRouter.use(protectRoute)

albumRouter.get('/', getAllAlbums)
albumRouter.get('/:id', getAlbum)

export default albumRouter