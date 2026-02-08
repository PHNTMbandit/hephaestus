import { Button, Slider } from "suwa-ui"
import type { ComponentDoc } from "../types/component-doc"

export const componentDocs: ComponentDoc[] = [
	{
		name: "Button",
		description: "A simple button component.",
		component: <Button>Click Me</Button>,
	},
	{
		name: "Slider",
		description: "A slider component for selecting values.",
		component: <Slider defaultValue={50} max={100} min={0} />,
	},
]
