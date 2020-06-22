import { Router } from 'express'
import { AuthController } from '../controllers'
import { JWT } from '../middleware'

export class AuthRouter {
	router: Router
	public controller: AuthController = new AuthController()

	constructor() {
		this.router = Router()
		this.routes()
	}
	routes() {
		this.router.post('/login', this.controller.login)
		this.router.post('/pass', this.controller.changePassword)
	}
}
