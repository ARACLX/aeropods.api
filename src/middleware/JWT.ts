import { Request, Response, NextFunction } from 'express'
import { verify, sign } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils'

export function JWT(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization
	let payload

	// Validate token and get dat
	try {
		payload = verify(token, JWT_SECRET)
		res.locals.payload = payload
	} catch (e) {
		// If token is not valid, respond with 401.
		res.status(401).send()
	}

	const userID = payload.userID
	const username = payload.username

	const freshToken = sign({ userID, username }, JWT_SECRET, {
		expiresIn: '1h',
	})

	res.setHeader('token', freshToken)

	next()
}
