import { faker } from '@faker-js/faker'
import chroma from 'chroma-js'
import { valueTypes } from '#/features/palette/utils'
import { Color } from '../components/color'
import { ColorProvider } from '../components/color-provider'
import { colorNameQueryOptions } from '../utils/queries'

import type { Meta, StoryObj } from '@storybook/react-vite'

const randomName = `${faker.word.adjective()} ${faker.word.noun()}`

export default {
  title: 'Color',
  component: ColorProvider,
  args: {
    color: {
      id: faker.string.uuid(),
      locked: false,
      value: chroma.random().hex(),
    },
  },
  argTypes: {
    color: {
      control: 'object',
    },
  },
} as Meta<typeof ColorProvider>

type Story = StoryObj<typeof ColorProvider>

export const Single: Story = {
  beforeEach: async ({ args, parameters }) => {
    const qc = parameters.tanstack.router.context.queryClient
    qc.setQueryData(colorNameQueryOptions(args.color.value).queryKey, randomName)
  },
  render: ({ color: { id, locked, value } }) => (
    <Color.Provider color={{ id, locked, value }}>
      <Color.Swatch size="medium" className="w-1/2">
        <Color.Header>
          <Color.Name size="large" />
        </Color.Header>
        <Color.Footer>
          <Color.Value>{valueTypes.rgb.displayColor(value)}</Color.Value>
          <Color.Actions>
            <Color.Copy />
          </Color.Actions>
        </Color.Footer>
      </Color.Swatch>
    </Color.Provider>
  ),
}
