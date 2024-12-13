import { clerkClient } from '@clerk/express'
import { ADMIN_EMAIL } from '../utils/config.js'

export const protectRoute = async (req, res, next) => {
  if(!req.auth.userId) {
    return res.status(401).json({ error: 'Unauthorized - you must be logged in' })
  }
  next()
}

export const verifyAdmin =async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId)
    const isAdmin = ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized - you must be an admin'})
    }
    next()
  } catch (error) {
    console.log('Error in auth middleware', error.message)
    next(error)
  }
}