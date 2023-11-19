import { Button } from '@/components/ui/button'

import { SignedIn, SignedOut, UserButton } from '@clerk/remix'
import { Link } from '@remix-run/react'

export default function Index() {
	return (
		<div>
			<SignedIn>
				<h1>Index route</h1>
				<p>You are signed in!</p>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<div>you are signed out</div>
				<Button asChild>
					<Link to='/login'>Sign In</Link>
				</Button>
			</SignedOut>
		</div>
	)
}
