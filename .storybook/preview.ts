import type { Preview } from "@storybook/react-vite"
import "../src/styles/output.css"
import { withThemeByDataAttribute } from "@storybook/addon-themes"

const preview: Preview = {
	parameters: {
		layout: "centered",
		options: {
			storySort: {
				method: "alphabetical",
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			test: "todo",
		},
	},
	decorators: [
		withThemeByDataAttribute({
			defaultTheme: "dark",
			themes: { dark: "dark", light: "light" },
			attributeName: "data-theme",
		}),
	],
}

export default preview
