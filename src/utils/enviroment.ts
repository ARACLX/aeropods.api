import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'unsecure'

export { JWT_SECRET }
