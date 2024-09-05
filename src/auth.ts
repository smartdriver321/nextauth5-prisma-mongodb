import NextAuth from 'next-auth'
import github from 'next-auth/providers/github'
import credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'

import { prisma } from './prisma'
import { saltAndHashPassword } from './lib/utils'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	providers: [
		github({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
		credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'email@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				if (!credentials || !credentials.email || !credentials.password) {
					return null
				}

				const email = credentials.email as string
				const hash = saltAndHashPassword(credentials.password)

				let user: any = await prisma.user.findUnique({
					where: {
						email,
					},
				})

				if (!user) {
					user = await prisma.user.create({
						data: {
							email,
							hashedPassword: hash,
						},
					})
				} else {
					const isMatch = bcrypt.compareSync(
						credentials.password as string,
						user.hashedPassword
					)

					if (!isMatch) {
						throw new Error('Incorrect password.')
					}
				}

				return user
			},
		}),
	],
})
