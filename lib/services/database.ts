import mongoose from 'mongoose'
import signale from 'signale'

import { MONGODB_URL } from '../utils/enviroment'

export class Database {
	constructor() {
		this.mongo()
	}

	// HACK: AER-2 Needs some tests but genrally it's completed.
	/* Implementation of Mongoose as a database controller */
	public mongo(): void {
		const connection = mongoose.connection
		connection.on('connected', () => {
			signale.success('MongoDB: Connection Estabilished.')
		})
		/* Connection Handling on "disconnect" */
		connection.on('disconnected', () => {
			signale.error('MongoDB: Connection Disconnected.')
			signale.log('MongoDB: Reconnecting...')
			setTimeout(() => {
				mongoose.connect(MONGODB_URL, {
					keepAlive: true,
					socketTimeoutMS: 3000,
					connectTimeoutMS: 3000,
				})
			}, 3000)
		})
		connection.on('reconnected', () => {
			signale.success('MongoDB: Connection Reestabilished.')
		})
		connection.on('close', () => {
			signale.success('MongoDB: Connection Closed.')
		})
		connection.on('error', (e: Error) => {
			signale.error('MongoDB Error:', e)
		})
		const runtime = async function() {
			await mongoose.connect(MONGODB_URL, {
				keepAlive: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
		}
		runtime().catch(e => signale.error(e))
	}
}
