'use client'

import { FaGithub } from 'react-icons/fa'

import { useSignIn } from '@/lib/actions/auths'

export default function LoginGithub() {
	return (
		<div
			className='w-full gap-4  hover:cursor-pointer mt-6 h-12 bg-black rounded-md p-4 flex justify-center items-center'
			onClick={() => useSignIn('github')}
		>
			<FaGithub className='text-white' />
			<p className='text-white'>Login with Github</p>
		</div>
	)
}
