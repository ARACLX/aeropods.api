import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

export class DefaultController {
	constructor() {}

	defaultFunction(req: Request, res: Response) {
		const pkg = require('../../package.json')
		res.json({
			name: pkg.name,
			version: pkg.version,
		})
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
