import Koa from 'koa'
import serve from 'koa-static'
import path from 'path'
import logger from 'koa-logger'
import { createRequestHandler } from 'remix-koa-adapter'

const app = new Koa()

const BUILD_DIR = path.join(process.cwd(), 'build')

app.use(logger())
app.use(serve('public'))

const remixAppHandler = createRequestHandler({
	build: require(BUILD_DIR),
	mode: process.env.NODE_ENV,
})

if (process.env.NODE_ENV === 'development') {
	app.use(async (ctx) => {
		purgeRequireCache()
		return remixAppHandler(ctx)
	})
} else {
	app.use(remixAppHandler)
}

const port = process.env.PORT ?? 3000
app.listen(port, () => {
	console.log(`✅ App listening on port ${port}`)
})

/**
 * Purge require cache on request for "server side HMR"
 */
function purgeRequireCache() {
	for (const key in require.cache) {
		if (key.startsWith(BUILD_DIR)) {
			delete require.cache[key]
		}
	}
}
