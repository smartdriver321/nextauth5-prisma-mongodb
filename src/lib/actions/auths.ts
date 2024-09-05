'use server'

import { revalidatePath } from 'next/cache'
import { AuthError } from 'next-auth'

import { signIn, signOut } from '@/auth'
import { prisma } from '@/prisma'

export const useSignIn = async (provider: string) => {
	await signIn(provider, { redirectTo: '/' })
	revalidatePath('/')
}

export const useSignOut = async () => {
	await signOut({ redirectTo: '/' })
	revalidatePath('/')
}

const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return user
	} catch (error) {
		console.log(error)
		return null
	}
}

export const signInWithCreds = async (formData: FormData) => {
	const rawFormData = {
		email: formData.get('email'),
		password: formData.get('password'),
		role: 'ADMIN',
		redirectTo: '/',
	}

	const existingUser = await getUserByEmail(formData.get('email') as string)
	console.log(existingUser)

	try {
		await signIn('credentials', rawFormData)
	} catch (error: any) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' }
				default:
					return { error: 'Something went wrong!' }
			}
		}

		throw error
	}
	revalidatePath('/')
}
