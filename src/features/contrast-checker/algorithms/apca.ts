import chroma from 'chroma-js'
import { APCA_LEVELS } from '../constants/apca-levels'

import type { ContrastAlgorithm, TextSize } from '../types/algorithm'

// APCA-W3 0.1.9 constants — https://github.com/Myndex/apca-w3
const MAIN_TRC = 2.4
const R_CO = 0.2126729
const G_CO = 0.7151522
const B_CO = 0.072175

const NORM_BG = 0.56
const NORM_TXT = 0.57
const REV_TXT = 0.62
const REV_BG = 0.65

const BLK_THRS = 0.022
const BLK_CLMP = 1.414
const SCALE = 1.14
const LO_BOW_OFFSET = 0.027
const LO_WOB_OFFSET = 0.027
const DELTA_Y_MIN = 0.0005
const LO_CLIP = 0.1

const linearize = (channel: number): number => Math.pow(channel / 255, MAIN_TRC)

const screenLuminance = (color: string): number => {
  const [r, g, b] = chroma(color).rgb()
  return R_CO * linearize(r) + G_CO * linearize(g) + B_CO * linearize(b)
}

const softClampBlack = (luminance: number): number =>
  luminance >= BLK_THRS ? luminance : luminance + Math.pow(BLK_THRS - luminance, BLK_CLMP)

// Lightness contrast (Lc): positive for dark text on light, negative for light on dark.
const lightnessContrast = (foreground: string, background: string): number => {
  const txtY = softClampBlack(screenLuminance(foreground))
  const bgY = softClampBlack(screenLuminance(background))

  if (Math.abs(bgY - txtY) < DELTA_Y_MIN) return 0

  let contrast: number
  if (bgY > txtY) {
    const sapc = (Math.pow(bgY, NORM_BG) - Math.pow(txtY, NORM_TXT)) * SCALE
    contrast = sapc < LO_CLIP ? 0 : sapc - LO_BOW_OFFSET
  } else {
    const sapc = (Math.pow(bgY, REV_BG) - Math.pow(txtY, REV_TXT)) * SCALE
    contrast = sapc > -LO_CLIP ? 0 : sapc + LO_WOB_OFFSET
  }

  return contrast * 100
}

// Simplified APCA readability targets by absolute Lc.
const APCA_TARGETS: Record<TextSize, { preferred: number; minimum: number }> = {
  normal: { preferred: APCA_LEVELS.bodyPreferred, minimum: APCA_LEVELS.bodyMinimum },
  large: { preferred: APCA_LEVELS.bodyMinimum, minimum: APCA_LEVELS.largeText },
}

export const apcaAlgorithm: ContrastAlgorithm = {
  method: 'APCA',
  label: 'APCA',
  description:
    'Perceptual lightness contrast (Lc) from APCA-W3, the polarity-aware contrast model proposed for WCAG 3.',
  references: [
    {
      label: 'APCA easy introduction',
      url: 'https://git.apcacontrast.com/documentation/APCAeasyIntro',
    },
    {
      label: 'APCA-W3 on GitHub',
      url: 'https://github.com/Myndex/apca-w3',
    },
    {
      label: 'WCAG 3 introduction',
      url: 'https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/',
    },
  ],
  scoreRange: { min: 0, max: 108 },
  calculate: (foreground, background) => lightnessContrast(foreground, background),
  formatScore: (score) => `Lc ${Math.round(score)}`,
  normalizeScore: (score) => Math.min(Math.abs(score) / 108, 1),
  evaluate: (score, textSize) => {
    const magnitude = Math.abs(score)
    const { preferred, minimum } = APCA_TARGETS[textSize]
    if (magnitude >= preferred) return { level: 'Preferred', passes: true }
    if (magnitude >= minimum) return { level: 'Minimum', passes: true }
    return { level: 'Fail', passes: false }
  },
  requirements: (score) => {
    const lc = Math.abs(score)
    return [
      {
        id: 'body',
        label: 'Body text',
        preview: 'body',
        checks: [
          { label: 'Minimum', threshold: 'Lc 75', passes: lc >= APCA_LEVELS.bodyMinimum },
          { label: 'Preferred', threshold: 'Lc 90', passes: lc >= APCA_LEVELS.bodyPreferred },
        ],
      },
      {
        id: 'large-text',
        label: 'Large text',
        preview: 'large',
        checks: [{ label: 'Minimum', threshold: 'Lc 60', passes: lc >= APCA_LEVELS.largeText }],
      },
      {
        id: 'headline',
        label: 'Headlines & bold',
        preview: 'heading',
        checks: [{ label: 'Minimum', threshold: 'Lc 45', passes: lc >= APCA_LEVELS.headline }],
      },
      {
        id: 'non-text',
        label: 'Non-text elements',
        preview: 'non-text',
        checks: [{ label: 'Minimum', threshold: 'Lc 30', passes: lc >= APCA_LEVELS.nonText }],
      },
    ]
  },
}
