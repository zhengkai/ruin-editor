import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'EVAL') return;
				warn(warning);
			},
		},
	},
});
