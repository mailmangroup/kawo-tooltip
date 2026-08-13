import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	server: {
		host: true,
		port: 4000
	},
	build: {
		target: 'es2015',
		lib: {
			name: 'kawo-tooltip',
			entry: resolve(__dirname, 'src/index.ts'),
			fileName: 'index'
		}
	}
});
