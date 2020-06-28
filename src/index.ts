// Basic packages that are used in ServerInstance
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
// import bugsnag from './services/bugsnag'

import { DefaultRouter, UserRouter } from './routers'

/** Main server class. */
export class ServerInstance {
	/* Basic Declarations */
	public core: express.Application

	/* Constructor of basic contents in class */
	constructor() {
		this.core = express()
		this.middleware()
		this.routes()
		this.errors()
	}

	/** Middleware of ServerInstance class */
	public middleware(): void {
		// this.core.use(bugsnag.requestHandler)
		this.core.use(bodyParser.json())
		this.core.use(bodyParser.urlencoded({ extended: false }))
		this.core.use(compression())
		this.core.use(cors())
		this.core.use(cookieParser())
		this.core.use(passport.initialize())
	}

	/* Routing contained in core */
	public routes(): void {
		this.core.use('/', new DefaultRouter().router)
		this.core.use('/user', new UserRouter().router)
	}

	public errors() {
		// this.core.use(bugsnag.requestHandler)
	}
}
