import type { WCAGGrade } from '../color.types'

export const WCAG_GRADES: Record<string, WCAGGrade> = {
  AAA: {
    label: 'AAA',
    thresholds: {
      normal: 7,
      large: 4.5,
    },
  },
  AA: {
    label: 'AA',
    thresholds: {
      normal: 4.5,
      large: 3,
    },
  },
  'AA Large': {
    label: 'AA Large',
    thresholds: {
      normal: 3,
      large: 3,
    },
  },
  Fail: {
    label: 'Fail',
    thresholds: {
      normal: 0,
      large: 0,
    },
  },
}
