import { Router } from 'express'
import { DefaultController } from '../controllers'

export class DefaultRouter {
	router: Router
	public controller: DefaultController = new DefaultController()

	constructor() {
		this.router = Router()
		this.routes()
	}
	routes() {
		this.router.get('/', this.controller.defaultFunction)
	}
}
