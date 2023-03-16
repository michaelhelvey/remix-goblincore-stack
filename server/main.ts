/* eslint-disable no-console */
import { type ServerBuild } from '@remix-run/node'
import Koa from 'koa'
import logger from 'koa-logger'
import serve from 'koa-static'
import path from 'path'
import { createRequestHandler } from 'remix-koa-adapter'

const app = new Koa()

const BUILD_DIR = path.join(process.cwd(), 'build')

app.use(logger())
app.use(serve('public'))

if (process.env.NODE_ENV === 'production') {
	app.use(
		createRequestHandler({
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			build: require(BUILD_DIR) as ServerBuild,
			mode: process.env.NODE_ENV,
		})
	)
} else {
	app.use((ctx) => {
		purgeRequireCache()
		return createRequestHandler({
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			build: require(BUILD_DIR) as ServerBuild,
			mode: process.env.NODE_ENV,
		})(ctx)
	})
}

const port = process.env.PORT ?? 3000
app.listen(port, () => {
	console.log(`✅ App listening on port ${port}`)
})

function purgeRequireCache() {
	// purge require cache on requests for "server side HMR"
	for (const key in require.cache) {
		if (key.startsWith(BUILD_DIR)) {
			delete require.cache[key]
		}
	}
}
