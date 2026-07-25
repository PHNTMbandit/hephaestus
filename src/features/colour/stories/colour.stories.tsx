import { faker } from '@faker-js/faker'
import chroma from 'chroma-js'
import { valueTypes } from '#/features/palette/utils'
import { Colour } from '../components/colour'
import { ColourProvider } from '../components/colour-provider'
import { colourNameQueryOptions } from '../utils/queries'

import type { Meta, StoryObj } from '@storybook/react-vite'

const randomName = `${faker.word.adjective()} ${faker.word.noun()}`

export default {
  title: 'Colour',
  component: ColourProvider,
  args: {
    colour: {
      id: faker.string.uuid(),
      locked: false,
      value: chroma.random().hex(),
    },
  },
  argTypes: {
    colour: {
      control: 'object',
    },
  },
} as Meta<typeof ColourProvider>

type Story = StoryObj<typeof ColourProvider>

export const Single: Story = {
  beforeEach: async ({ args, parameters }) => {
    const qc = parameters.tanstack.router.context.queryClient
    qc.setQueryData(colourNameQueryOptions(args.colour.value).queryKey, randomName)
  },
  render: ({ colour: { id, locked, value } }) => (
    <Colour.Provider colour={{ id, locked, value }}>
      <Colour.Block size="medium" className="w-1/2">
        <Colour.Header>
          <Colour.Name size="large" />
        </Colour.Header>
        <Colour.Footer>
          <Colour.Value>{valueTypes.rgb.displayColor(value)}</Colour.Value>
          <Colour.Actions>
            <Colour.Copy />
          </Colour.Actions>
        </Colour.Footer>
      </Colour.Block>
    </Colour.Provider>
  ),
}
