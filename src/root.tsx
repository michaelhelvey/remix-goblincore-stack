import { ClerkApp } from '@clerk/remix'
import { rootAuthLoader } from '@clerk/remix/ssr.server'
import { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import stylesheet from './globals.css'

export const links: LinksFunction = () => [
	{
		rel: 'stylesheet',
		href: stylesheet,
	},
]

export const meta: MetaFunction = () => [
	{
		charset: 'utf-8',
		title: 'Remix Goblincore Stack',
		viewport: 'width=device-width, initial-scale=1',
	},
]

export const loader: LoaderFunction = args => {
	return rootAuthLoader(args, () => {
		return {}
	})
}

function App() {
	return (
		<html lang='en'>
			<head>
				<Meta />
				<Links />
			</head>
			<body className='dark'>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default ClerkApp(App, {
	signInUrl: '/login',
	signUpUrl: '/signup',
	afterSignInUrl: '/',
	afterSignUpUrl: '/',
})
