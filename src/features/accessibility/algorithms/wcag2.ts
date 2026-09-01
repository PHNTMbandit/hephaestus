import chroma from 'chroma-js'
import { WCAG_CONFORMANCE_LEVELS } from '../constants/wcag-levels'

import type { ContrastAlgorithm } from '../types/algorithm'

const NON_TEXT_MINIMUM = 3

export const wcag2Algorithm: ContrastAlgorithm = {
  method: 'WCAG2',
  label: 'WCAG 2.2',
  description:
    'Relative luminance contrast ratio (1:1–21:1) per WCAG 2.2 success criteria 1.4.3, 1.4.6 and 1.4.11.',
  references: [
    {
      label: 'Understanding Contrast (Minimum)',
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    },
    {
      label: 'Understanding Contrast (Enhanced)',
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html',
    },
    {
      label: 'Understanding Non-text Contrast',
      url: 'https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html',
    },
  ],
  scoreRange: { min: 1, max: 21 },
  calculate: (foreground, background) => chroma.contrast(foreground, background),
  formatScore: (score) => `${score.toFixed(2)} : 1`,
  normalizeScore: (score) => Math.min(Math.max((score - 1) / 20, 0), 1),
  evaluate: (score, textSize) => {
    if (score >= WCAG_CONFORMANCE_LEVELS.AAA.minimumContrastRatios[textSize]) {
      return { level: WCAG_CONFORMANCE_LEVELS.AAA.conformanceLevel, passes: true }
    }
    if (score >= WCAG_CONFORMANCE_LEVELS.AA.minimumContrastRatios[textSize]) {
      return { level: WCAG_CONFORMANCE_LEVELS.AA.conformanceLevel, passes: true }
    }
    return { level: WCAG_CONFORMANCE_LEVELS.Fail.conformanceLevel, passes: false }
  },
  requirements: (score) => [
    {
      id: 'normal',
      label: 'Normal text',
      preview: 'body',
      checks: [
        {
          label: 'AA',
          threshold: '4.5:1',
          passes: score >= WCAG_CONFORMANCE_LEVELS.AA.minimumContrastRatios.normal,
        },
        {
          label: 'AAA',
          threshold: '7:1',
          passes: score >= WCAG_CONFORMANCE_LEVELS.AAA.minimumContrastRatios.normal,
        },
      ],
    },
    {
      id: 'large',
      label: 'Large text',
      preview: 'large',
      checks: [
        {
          label: 'AA',
          threshold: '3:1',
          passes: score >= WCAG_CONFORMANCE_LEVELS.AA.minimumContrastRatios.large,
        },
        {
          label: 'AAA',
          threshold: '4.5:1',
          passes: score >= WCAG_CONFORMANCE_LEVELS.AAA.minimumContrastRatios.large,
        },
      ],
    },
    {
      id: 'non-text',
      label: 'UI & graphics',
      preview: 'non-text',
      checks: [
        {
          label: 'AA',
          threshold: '3:1',
          passes: score >= NON_TEXT_MINIMUM,
        },
      ],
    },
  ],
}
