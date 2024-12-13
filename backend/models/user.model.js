import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    requires: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User