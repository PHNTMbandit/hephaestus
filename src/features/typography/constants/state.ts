import { fontWeights } from './font-weight'
import { typeScales } from './scale'

import type { TypographyState } from '../types/state'

export const defaultTypographyState: TypographyState = {
  background: '#000000',
  color: '#ffffff',
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
