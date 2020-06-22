import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { compareSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils'

export class AuthController {
	public async login(req: Request, res: Response) {
		const prisma = new PrismaClient()
		let { username, password } = req.body

		// Check existance of username and password
		if (!(username && password)) {
			res.status(400).send()
		}

		// Get user from database
		let user
		try {
			user = await prisma.user.findOne({
				where: {
					username: username,
				},
			})
		} catch (error) {
			res.status(401).send()
		}

		// Check if encrypted password match
		if (!compareSync(password, user.password)) {
			res.status(401).send()
		}

		// Sign JWT
		const token = sign(
			{ userID: user.id, username: user.username },
			JWT_SECRET,
			{ expiresIn: '1h' }
		)

		// Send the JWT in response
		res.send(token)
	}
	public async changePassword(req: Request, res: Response) {
		const prisma = new PrismaClient()
		const id = res.locals.payload.userID
		let { oldPassword, newPassword } = req.body

		if (!(oldPassword && newPassword)) {
			res.status(400).send()
		}

		// Get User from database
		let user

		try {
			user = prisma.user.findOne({
				where: {
					id: id,
				},
			})
		} catch (e) {
			res.status(401).send()
		}

		if (!compareSync(oldPassword, user.password)) {
			res.status(401).send()
			return
		}

		// Hash new password
		newPassword = hashSync(newPassword, 8)

		prisma.user.update({
			where: {
				id: id,
			},
			data: {
				password: newPassword,
			},
		})

		res.status(204).send()
	}
}
