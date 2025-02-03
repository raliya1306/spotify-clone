import express from 'express'
import { FRONTEND_URI, NODE_ENV, PORT } from '../utils/config.js'
import connectToMongoDb from '../utils/db.js'
import { clerkMiddleware } from '@clerk/express'
import fileUpload from 'express-fileupload'
import path from 'path'
import cors from 'cors'
import cron from 'node-cron'
import fs from 'fs'

import authRouter from '../routes/auth.route.js'
import adminRouter from '../routes/admin.route.js'
import songRouter from '../routes/song.route.js'
import albumRouter from '../routes/album.route.js'
import statsRouter from '../routes/stats.route.js'
import errorHandler from '../middleware/errorHandler.middleware.js'

const __dirname = path.resolve()
const app = express()

app.use(cors(
	{
		origin: FRONTEND_URI,
		credentials: true
	}
))

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

const tempDir = path.join(process.cwd(), 'tmp')
cron.schedule('0 * * * *', () => {
	if (fs.existsSync(tempDir)) {
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log('error', err)
				return
			}
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => { })
			}
		})
	}
})

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/songs', songRouter)
app.use('/api/albums', albumRouter)
app.use('/api/stats', statsRouter)

if (NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/dist')))
}

app.use(errorHandler)

app.listen(PORT, () => {
	connectToMongoDb()
	console.log(`Server running at port ${PORT}`)
})