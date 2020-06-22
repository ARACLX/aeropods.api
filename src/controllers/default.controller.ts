import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class DefaultController {
	constructor() {}
	public defaultFunction(req: Request, res: Response) {
		res.json('Hello World')
	}
	public async createUser(req: Request, res: Response) {
		const prisma = new PrismaClient()
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: req.body.password,
				role: req.body.role,
			},
		})
		res.json(user).status(200)
	}
}
