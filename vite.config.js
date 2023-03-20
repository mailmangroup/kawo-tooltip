/** @type {import('vite').UserConfig} */
export default {
	server: {
		host: true,
		port: 4000
	},
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		lib: {
			name: 'kawo-tooltip',
			entry: 'src/kawo-tooltip.ts',
			formats: ['es']
		}
	}
};
