import type { WCAGConformance } from '../types/conformance'

export const WCAG_CONFORMANCE_LEVELS: Record<string, WCAGConformance> = {
  AAA: {
    conformanceLevel: 'AAA',
    minimumContrastRatios: {
      normal: 7,
      large: 4.5,
    },
  },
  AA: {
    conformanceLevel: 'AA',
    minimumContrastRatios: {
      normal: 4.5,
      large: 3,
    },
  },
  Fail: {
    conformanceLevel: 'Fail',
    minimumContrastRatios: {
      normal: 0,
      large: 0,
    },
  },
}
