import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils'

export class AuthController {
	constructor() {}
	public async login(req: Request, res: Response) {
		// Prisma
		const prisma = new PrismaClient()

		// Core body data
		const username = req.body.username
		const password = req.body.password

		// Find user by username
		const user = await prisma.user.findOne({
			where: {
				username: username,
			},
		})

		// Check password
		compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// User Matched, Create JWT Payload
				const payload = {
					id: user.id,
					username: user.username,
				}

				// Sign Token
				sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
					res.json({
						token: 'Bearer ' + token,
					})
				})
			} else {
				return res.status(400).json({ error: 'Password Incorrect.' })
			}
		})
	}
}
