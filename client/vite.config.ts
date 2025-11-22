import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		exclude: ['@protobufjs/inquire'],
	},
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (warning.code === 'EVAL') return;
				warn(warning);
			},
		},
	},
});
