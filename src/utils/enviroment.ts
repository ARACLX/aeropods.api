import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'unsecure'
const AEROSERV_PORT = process.env.AEROSERV_PORT
const HOST = process.env.HOST || 'localhost'

export { JWT_SECRET, AEROSERV_PORT, HOST }
