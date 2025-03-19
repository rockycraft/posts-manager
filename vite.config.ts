import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		visualizer({
			filename: "dist/stats.html",
			open: true,
			gzipSize: true,
		}),
	],
	build: {
		minify: "terser",
		cssCodeSplit: true,
		chunkSizeWarningLimit: 500,
		rollupOptions: {
			output: {
				manualChunks: {
					"react-vendor": ["react", "react-dom"],
					"chakra-ui-vendor": [
						"@chakra-ui/react",
						"@emotion/react",
						"react-icons",
						"next-themes",
					],
					"axios-vendor": ["axios"],
					"redux-vendor": ["@reduxjs/toolkit", "react-redux"],
					"react-hook-form-vendor": ["react-hook-form", "@hookform/resolvers"],
					"tanstack-vendor": ["@tanstack/react-table"],
				},
			},
		},
	},
	test: {
		include: ["src/**/*.test.{tsx,ts}"],
		exclude: ["node_modules", "dist", "coverage", "src/mocks/**/*"],
		environment: "jsdom",
		globals: true,
		testTimeout: 10000,
		// setupFiles: ["<rootDir>/src/setupTests.ts"],
		coverage: {
			provider: "v8",
			reporter: ["html"],
			include: ["src/**"],
			exclude: [
				"src/**/*.test.{tsx,ts}",
				"src/mocks/**/*",
				"src/components/ui/**/*",
				"src/vite-env.d.ts",
				"src/main.tsx",
			],
		},
	},
});
