'use client'

import { useSignOut } from '@/lib/actions/auths'

export default function SignOut() {
	return (
		<div onClick={() => useSignOut()}>
			<div className='bg-gray-600 text-white text-sm px-4 py-2 rounded-md cursor-pointer'>
				Sign Out
			</div>
		</div>
	)
}
