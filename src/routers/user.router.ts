import { Router } from 'express'
import { UserController } from '../controllers'

export class UserRouter {
	router: Router
	public controller: UserController = new UserController()

	constructor() {
		this.router = Router()
		this.routes()
	}
	routes() {
		this.router.get('/', this.controller.allUsers)
		this.router.get('/:id', this.controller.getUser)
		this.router.post('/', this.controller.createUser)
		this.router.patch('/:id', this.controller.updateUser)
		this.router.delete('/:id', this.controller.deleteUser)
	}
}
