'use server'

import { revalidatePath } from 'next/cache'

import { signIn, signOut } from '@/auth'

export const useSignIn = async (provider: string) => {
	await signIn(provider, { redirectTo: '/' })
	revalidatePath('/')
}

export const useSignOut = async () => {
	await signOut({ redirectTo: '/' })
	revalidatePath('/')
}
