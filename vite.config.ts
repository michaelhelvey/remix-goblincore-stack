import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: './test/setup-test-env.ts',
		exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/coverage/**'],
		coverage: {
			provider: 'v8',
		},
	},
})
