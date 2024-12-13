import { NODE_ENV } from '../utils/config.js'

const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  res.status(500).json({ error: NODE_ENV === 'production' ? 'Internal Server Error' : err.message })
}

export default errorHandler