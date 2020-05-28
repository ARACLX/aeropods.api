// Basic packages that are used in ServerInstance.
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

// Packages contained in code which refers to routers, utilities and so on.
import { AboutRouter } from './routers'
import { Database } from './services'

export class ServerInstance {
	/* Basic Declarations */
	public core: express.Application

	/* Constuctor of basic variables */
	constructor() {
		this.core = express()
		this.middleware()
		this.routes()
		// this.database()
	}

	/* Middleware of server */
	public middleware(): void {
		this.core.use(bodyParser.json())
		this.core.use(bodyParser.urlencoded({ extended: false }))
		this.core.use(compression())
		this.core.use(cors())
		this.core.use(morgan('dev'))
	}

	/* Routers contained in application */
	public routes(): void {
		this.core.use('/', new AboutRouter().router)
		// this.core.use('/user', new UserRouter().router)
	}

	/* Implmenetation of service responsible for database */
	private database(): void {
		new Database().mongo
	}
}
