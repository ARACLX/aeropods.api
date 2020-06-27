import { Strategy as JWT } from 'passport-jwt'
import { ExtractJwt as extract } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'
import { JWT_SECRET } from '../utils'

import passport from 'passport'
import signale from 'signale'

// Code in progress, isn't able to be used yet.

passport.use(
	new JWT(
		{
			jwtFromRequest: extract.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET,
		},
		(payload, callback) => {
			const prisma = new PrismaClient()
			let user
			try {
				user = prisma.user.findOne({
					where: {
						id: payload.id,
					},
				})
			} catch (e) {
				signale.error(e)
				return callback(null, false)
			}
			return callback(null, user)
		}
	)
)
