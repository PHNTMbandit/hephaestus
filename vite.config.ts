import netlify from "@netlify/vite-plugin-tanstack-start"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { nitro } from "nitro/vite"
import viteTsConfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

const config = defineConfig({
	plugins: [
		devtools(),
		nitro(),
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		netlify(),
		tanstackStart(),
		viteReact({
			babel: {
				plugins: ["babel-plugin-react-compiler"],
			},
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		css: true,
	},
	optimizeDeps: {
		include: [
			"@phosphor-icons/react",
			"@tanstack/react-form",
			"@tanstack/react-form-start",
		],
	},
})

export default config
