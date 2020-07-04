import dotenv from 'dotenv'

dotenv.config()

// General Enviroment Configuration
const HOST: string | number = process.env.HOST || 'localhost'
const AEROSERV_PORT: number | string = process.env.AEROSERV_PORT

// CockroachDB Configuration
const COCKROACH_HOST: string = process.env.COCKROACH_HOST || 'localhost'
const COCKROACH_USERNAME: string = process.env.COCKROACH_USERNAME || 'root'
const COCKROACH_PASSWORD: string = process.env.COCKROACH_PASSWORD || ''
const COCKROACH_DATABASE: string = process.env.COCKROACH_DATABASE || 'defaultdb'
const COCKROACH_PORT: number | string = process.env.COCKROACH_HOST || 26257

// Configuration of security
const JWT_SECRET: string = process.env.JWT_SECRET || 'unsecure'

// Configuration of infrastructure
const BUGSNAG_KEY = ''

export {
	JWT_SECRET,
	AEROSERV_PORT,
	HOST,
	BUGSNAG_KEY,
	COCKROACH_HOST,
	COCKROACH_USERNAME,
	COCKROACH_PASSWORD,
	COCKROACH_DATABASE,
	COCKROACH_PORT,
}
