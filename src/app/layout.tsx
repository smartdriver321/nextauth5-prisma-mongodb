import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import localFont from 'next/font/local'

import './globals.css'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()

	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<div className='mx-auto max-w-screen-lg h-screen flex flex-col'>
						<Navbar />
						<div className='flex-grow'>{children}</div>{' '}
					</div>
				</body>
			</html>
		</SessionProvider>
	)
}
