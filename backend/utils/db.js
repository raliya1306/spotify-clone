import mongoose from 'mongoose'
import { MONGODB_URI } from './config.js'

const connectToMongoDb = async () => {
	try {
		await mongoose.connect(MONGODB_URI)
		console.log('Connected to MongoDB')		
	} catch (error) {
		console.log('Error connecting to MongoDB', error.message)
		process.exit(1)
	}
}

export default connectToMongoDb