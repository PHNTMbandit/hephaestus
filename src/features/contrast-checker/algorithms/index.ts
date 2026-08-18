import { apcaAlgorithm } from './apca'
import { wcag2Algorithm } from './wcag2'

import type { ContrastAlgorithm } from '../types/algorithm'
import type { ContrastMethod } from '../types/methods'

export const CONTRAST_ALGORITHMS: Record<ContrastMethod, ContrastAlgorithm> = {
  WCAG2: wcag2Algorithm,
  APCA: apcaAlgorithm,
}

export const getContrastAlgorithm = (method: ContrastMethod): ContrastAlgorithm =>
  CONTRAST_ALGORITHMS[method]
