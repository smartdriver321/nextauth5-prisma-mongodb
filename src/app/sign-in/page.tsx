import LoginForm from '@/components/LoginForm'
import LoginGithub from '@/components/LoginGithub'

export default function SignInPage() {
	return (
		<div className='w-full flex mt-20 justify-center'>
			<section className='flex flex-col w-[400px]'>
				<h1 className='text-3xl w-full text-center font-bold mb-6'>Sign In</h1>
				<LoginForm />
				<LoginGithub />
			</section>
		</div>
	)
}
