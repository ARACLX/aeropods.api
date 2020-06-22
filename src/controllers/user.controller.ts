import { Request, Response } from 'express'
import { PrismaClient, prismaVersion } from '@prisma/client'
import bcrypt from 'bcrypt'

export class UserController {
	/**
	 * Provides list of all users available in database.
	 * @param req Request
	 * @param res Response
	 */
	public async allUsers(req: Request, res: Response) {
		const prisma = new PrismaClient()
		const users = await prisma.user.findMany()
		res.send(users)
	}
	/**
	 * Provides information about user with specified username.
	 * @param req Request
	 * @param res Response
	 */
	public async getUser(req: Request, res: Response) {
		const prisma = new PrismaClient()
		try {
			const user = await prisma.user.findOne({
				where: {
					username: req.params.id,
				},
			})
			res.send(user).status(200)
		} catch (e) {
			res.status(404).send('User not found.')
		}
	}
	/**
	 * Create a new user.
	 * @param req
	 * @param res
	 */
	public async createUser(req: Request, res: Response) {
		const prisma = new PrismaClient()
		// Data from body
		let { username, password, role } = req.body
		// Password Hashing
		password = bcrypt.hashSync(password, 8)
		// Try to save. Check availablity.
		try {
			await prisma.user.create({
				data: {
					username: username,
					password: password,
					role: role,
				},
			})
		} catch (e) {
			res.status(409).send('Username already in usage.')
			return
		}

		res.status(201).send('User Created.')
	}
	/**
	 * Updates Username and Role of existing user.
	 * @param req
	 * @param res
	 */
	public async updateUser(req: Request, res: Response) {
		const prisma = new PrismaClient()
		//Get the ID from the url
		const id = req.params.id
		// Data from body
		let { username, password, role } = req.body
		// Try to find user in database
		try {
			await prisma.user.findOne({
				where: {
					username: id,
				},
			})
		} catch (e) {
			res.status(404).send('User not found.')
			return
		}
		// Try to save, if fail - username in use.
		try {
			await prisma.user.update({
				where: {
					username: id,
				},
				data: {
					username: username,
					role: role,
				},
			})
		} catch (e) {
			res.status(409).send('Username already in use.')
			return
		}
		res.status(200).send('User updated.')
	}
	public async deleteUser(req: Request, res: Response) {
		const prisma = new PrismaClient()

		const id = req.params.id

		try {
			await prisma.user.findOne({
				where: {
					username: id,
				},
			})
		} catch (e) {
			res.send(404).send('User not found.')
			return
		}

		await prisma.user.delete({
			where: {
				username: id,
			},
		})

		res.send('User deleted.').status(204)
	}
}
