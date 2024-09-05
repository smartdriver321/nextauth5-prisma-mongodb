import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export default async function ServerPage() {
	const session = await auth()
	if (!session?.user) {
		redirect('/')
	}
	return (
		<main className='flex h-full items-center justify-center flex-col gap-2'>
			<h1 className='text-3xl'>Server Page</h1>
			<p className='text-lg'>{session?.user?.email}</p>
		</main>
	)
}
