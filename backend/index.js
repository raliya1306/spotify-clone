import express from 'express'
import { PORT } from './utils/config.js'
import connectToMongoDb from './utils/db.js'
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'

import authRouter from './routes/auth.route.js'
import adminRouter from './routes/admin.route.js'
import songRouter from './routes/song.route.js'
import albumRouter from './routes/album.route.js'
import statsRouter from './routes/stats.route.js'
import errorHandler from './middleware/errorHandler.middleware.js'

const __dirname = path.resolve()
const app = express()
app.use(express.json())
app.use(clerkMiddleware())
app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: path.join(__dirname, 'tmp'),
	createParentPath: true,
	limits: {
		fileSize: 10 * 1024 * 1024
	}
}))

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/songs', songRouter)
app.use('/api/albums', albumRouter)
app.use('/api/stats', statsRouter)

app.use(errorHandler)

app.listen(PORT, () => {
	connectToMongoDb()
	console.log(`Server running at port ${PORT}`)
})