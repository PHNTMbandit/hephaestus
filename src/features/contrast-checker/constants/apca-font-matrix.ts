// APCA-W3 0.1.7 (G) font lookup table — https://github.com/Myndex/apca-w3
// Rows are Lc thresholds; columns are font weights 100–900.
// Cell values are the minimum font size (px) usable at that Lc + weight.
// Sentinels: 999 = prohibited (contrast too low), 777 = non-text only.
export const APCA_FONT_WEIGHTS = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const APCA_LC_THRESHOLDS = [
  0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115,
  120, 125,
]

const APCA_FONT_MATRIX: number[][] = [
  [999, 999, 999, 999, 999, 999, 999, 999, 999],
  [999, 999, 999, 999, 999, 999, 999, 999, 999],
  [777, 777, 777, 777, 777, 777, 777, 777, 777],
  [777, 777, 777, 777, 777, 777, 777, 777, 777],
  [777, 777, 777, 120, 120, 108, 96, 96, 96],
  [777, 777, 120, 108, 108, 96, 72, 72, 72],
  [777, 120, 108, 96, 72, 60, 48, 48, 48],
  [120, 108, 96, 60, 48, 42, 32, 32, 32],
  [108, 96, 72, 42, 32, 28, 24, 24, 24],
  [96, 72, 60, 32, 28, 24, 21, 21, 21],
  [80, 60, 48, 28, 24, 21, 18, 18, 18],
  [72, 48, 42, 24, 21, 18, 16, 16, 18],
  [68, 46, 32, 21.75, 19, 17, 15, 16, 18],
  [64, 44, 28, 19.5, 18, 16, 14.5, 16, 18],
  [60, 42, 24, 18, 16, 15, 14, 16, 18],
  [56, 38.25, 23, 17.25, 15.81, 14.81, 14, 16, 18],
  [52, 34.5, 22, 16.5, 15.625, 14.625, 14, 16, 18],
  [48, 32, 21, 16, 15.5, 14.5, 14, 16, 18],
  [45, 28, 19.5, 15.5, 15, 14, 13.5, 16, 18],
  [42, 26.5, 18.5, 15, 14.5, 13.5, 13, 16, 18],
  [39, 25, 18, 14.5, 14, 13, 12, 16, 18],
  [36, 24, 18, 14, 13, 12, 11, 16, 18],
  [34.5, 22.5, 17.25, 12.5, 11.875, 11.25, 10.625, 14.5, 16.5],
  [33, 21, 16.5, 11, 10.75, 10.5, 10.25, 13, 15],
  [32, 20, 16, 10, 10, 10, 10, 12, 14],
]

const PROHIBITED = 999
const NON_TEXT_ONLY = 777

export type ApcaFontResult =
  | { status: 'ok'; minFontSize: number }
  | { status: 'non-text' }
  | { status: 'prohibited' }

// Minimum usable font size for the given Lc and weight, snapping Lc down to the nearest table row.
export const lookupApcaFont = (score: number, fontWeight: number): ApcaFontResult => {
  const lc = Math.abs(score)
  const columnIndex = APCA_FONT_WEIGHTS.indexOf(fontWeight)
  if (columnIndex === -1) return { status: 'prohibited' }

  let rowIndex = 0
  for (let i = 0; i < APCA_LC_THRESHOLDS.length; i++) {
    if (APCA_LC_THRESHOLDS[i] <= lc) rowIndex = i
    else break
  }

  const value = APCA_FONT_MATRIX[rowIndex][columnIndex]
  if (value === PROHIBITED) return { status: 'prohibited' }
  if (value === NON_TEXT_ONLY) return { status: 'non-text' }
  return { status: 'ok', minFontSize: value }
}
