import { config } from 'dotenv'
import path from 'path'
import signale from 'signale'

config()

let { MONGODB_URL, JWT_SECRET, NODE_ENV } = process.env


if (!JWT_SECRET && NODE_ENV !== 'production') {
	JWT_SECRET = 'unsecureJWT'
	signale.info("DotENV: JWT_SECRET = unsecureJWT")
}

if (!MONGODB_URL && NODE_ENV !== 'production') {
	MONGODB_URL = 'mongodb://mongo:27017'
	signale.info("DotENV: MONGODB_URL = mongodb://mongo:27017")
}

export { MONGODB_URL, JWT_SECRET, NODE_ENV }
