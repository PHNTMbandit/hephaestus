import type { FontWeight, FontWeightOption } from './types/font-weight'
import type { TypographyState } from './types/state'
import type { TypeScale, TypographyScaleType } from './types/type-scale'

export const typeScales: Record<TypographyScaleType, TypeScale> = {
  minorSecond: {
    id: 0,
    name: 'Minor Second',
    ratio: 1.067,
  },
  majorSecond: {
    id: 1,
    name: 'Major Second',
    ratio: 1.125,
  },
  minorThird: {
    id: 2,
    name: 'Minor Third',
    ratio: 1.2,
  },
  majorThird: {
    id: 3,
    name: 'Major Third',
    ratio: 1.25,
  },
  perfectFourth: {
    id: 4,
    name: 'Perfect Fourth',
    ratio: 1.333,
  },
  augmentedFourth: {
    id: 5,
    name: 'Augmented Fourth',
    ratio: 1.414,
  },
  perfectFifth: {
    id: 6,
    name: 'Perfect Fifth',
    ratio: 1.5,
  },
  goldenRatio: {
    id: 7,
    name: 'Golden Ratio',
    ratio: 1.618,
  },
}

export const typeSteps = [
  {
    index: 0,
    step: -2,
  },
  {
    index: 1,
    step: -1,
  },
  {
    index: 2,
    step: 0,
  },
  {
    index: 3,
    step: 1,
  },
  {
    index: 4,
    step: 2,
  },
  {
    index: 5,
    step: 3,
  },
  {
    index: 6,
    step: 4,
  },
  {
    index: 7,
    step: 5,
  },
]

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

export const defaultTypographyState: TypographyState = {
  background: '#000000',
  colour: '#ffffff',
  fontStyle: {
    family: 'Inter',
    variants: ['regular', 'italic'],
    subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
    version: 'v20',
    lastModified: '2025-09-10',
    files: {
      regular: 'https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTfvgaQc78lA2.woff2',
      italic: 'https://fonts.gstatic.com/s/inter/v20/UcCm3FwrK3iLTcvnYwYZ90A2B58.woff2',
    },
    category: 'sans-serif',
    kind: 'webfonts#webfont',
    menu: 'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZlhiA.woff2',
  },
  fontSize: 16,
  fontWeight: fontWeights[400],
  letterSpacing: 0,
  lineHeight: 1.5,
  scale: typeScales.minorThird,
}
