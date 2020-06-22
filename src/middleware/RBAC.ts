import e, { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

export function RBAC(roles: Array<string>) {
	return async (req: Request, res: Response, next: NextFunction) => {
		// Get ID of User from JWT Middleware.
		const userID = res.locals.payload.userID
		const prisma = new PrismaClient()

		let user

		try {
			user = await prisma.user.findOne({
				where: {
					id: userID,
				},
			})
		} catch (e) {
			res.status(401).send()
		}

		// Check if array of authorized roles includes in User roles.
		if (roles.indexOf(user.role) > -1) {
			next()
		} else {
			res.status(401).send()
		}
	}
}
