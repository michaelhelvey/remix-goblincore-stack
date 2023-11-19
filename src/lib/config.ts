import { z } from 'zod'

const envConfigSchema = z.object({
	DATABASE_URL: z.string().url(),
	CLERK_PUBISHABLE_KEY: z.string(),
	CLERK_SECRET_KEY: z.string(),
})

envConfigSchema.parse(process.env)

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		export interface ProcessEnv extends z.infer<typeof envConfigSchema> {}
	}
}
