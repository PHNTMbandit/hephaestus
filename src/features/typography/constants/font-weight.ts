import type { FontWeight, FontWeightOption } from '../types/font-weight'

export const fontWeights: Record<FontWeightOption, FontWeight> = {
  100: { id: 0, name: 'Thin', weight: 100 },
  200: { id: 1, name: 'Extra Light', weight: 200 },
  300: { id: 2, name: 'Light', weight: 300 },
  400: { id: 3, name: 'Regular', weight: 400 },
  500: { id: 4, name: 'Medium', weight: 500 },
  600: { id: 5, name: 'Semi Bold', weight: 600 },
  700: { id: 6, name: 'Bold', weight: 700 },
  800: { id: 7, name: 'Extra Bold', weight: 800 },
  900: { id: 8, name: 'Black', weight: 900 },
}
