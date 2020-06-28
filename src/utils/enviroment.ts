import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'unsecure'
const HOST = process.env.HOST || 'localhost'

const { AEROSERV_PORT } = process.env

const BUGSNAG_KEY = '24050181c9b6e6786c0de363bb4752c6'

export { JWT_SECRET, AEROSERV_PORT, HOST, BUGSNAG_KEY }
