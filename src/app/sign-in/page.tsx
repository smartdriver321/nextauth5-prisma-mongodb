import SignInForm from '@/components/SignInForm'
import SignInGithub from '@/components/SignInGithub'

export default function SignInPage() {
	return (
		<div className='w-full flex mt-20 justify-center'>
			<section className='flex flex-col w-[400px]'>
				<h1 className='text-3xl w-full text-center font-bold mb-6'>Sign In</h1>
				<SignInForm />
				<SignInGithub />
			</section>
		</div>
	)
}
