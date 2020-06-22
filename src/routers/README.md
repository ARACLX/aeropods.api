# `@aeropods/api/routers`

Directory which contains routers of server application and it's linked to
`controllers` directory which holds all of controller that are used in routers.

## Router Template

There are small template of router that may help you to create a new ones.

```ts
import { Router } from 'express'
import { TemplateController } from '../controllers'

/** Example router that returns a Hello World from controller, it's responsible for being a boilerplate to quickly create a new ones, delete that if you don't need a sample one. */
export class TemplateRouter {
	router: Router
	public controller: TemplateController = new TemplateController()

	constructor() {
		this.router = Router()
		this.routes()
	}
	routes() {
		this.router.get('/', this.controller.templateFunction)
	}
}
```
