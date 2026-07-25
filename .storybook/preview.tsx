import { withThemeByDataAttribute } from '@storybook/addon-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import type { Preview } from '@storybook/react-vite'

import '../src/styles/output.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
})

const preview: Preview = {
  parameters: {
    tanstack: {
      router: {
        context: {
          queryClient,
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      defaultTheme: 'dark',
      themes: { dark: 'dark', light: 'light' },
      attributeName: 'data-theme',
    }),
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
}

export default preview
