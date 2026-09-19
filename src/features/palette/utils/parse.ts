import chroma from 'chroma-js'

import type { Color } from '#/features/color/color.types'

const NUMBER_PATTERN = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)`

const rgbColorRegex =
  /^(?:rgb)\(\s*(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})(?:\s*,\s*|\s+)(\d{1,3})\s*\)$/i
const hslColorRegex = new RegExp(
  String.raw`^hsl\(\s*(${NUMBER_PATTERN})(?:deg)?\s+(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})%\s*\)$`,
  'i',
)
const hsvColorRegex = new RegExp(
  String.raw`^color\(\s*hsv\s+(${NUMBER_PATTERN})(?:deg)?\s+(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})%\s*\)$`,
  'i',
)
const cmykColorRegex = new RegExp(
  String.raw`^device-cmyk\(\s*(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})%\s*\)$`,
  'i',
)
const labColorRegex = new RegExp(
  String.raw`^lab\(\s*(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})\s+(${NUMBER_PATTERN})\s*\)$`,
  'i',
)
const lchColorRegex = new RegExp(
  String.raw`^lch\(\s*(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})\s+(${NUMBER_PATTERN})(?:deg)?\s*\)$`,
  'i',
)
const oklchColorRegex = new RegExp(
  String.raw`^oklch\(\s*(${NUMBER_PATTERN})%\s+(${NUMBER_PATTERN})\s+(${NUMBER_PATTERN})(?:deg)?\s*\)$`,
  'i',
)

type ComponentRange = readonly [minimum: number, maximum: number]

const parseComponents = (
  input: string,
  pattern: RegExp,
  ranges: readonly ComponentRange[],
): number[] | null => {
  const match = input.trim().match(pattern)
  if (!match) {
    return null
  }

  const components = match.slice(1).map(Number)
  const isInRange = components.every(
    (component, index) =>
      Number.isFinite(component) && component >= ranges[index][0] && component <= ranges[index][1],
  )

  return isInRange ? components : null
}

const parseRgb = (input: string) =>
  parseComponents(input, rgbColorRegex, [
    [0, 255],
    [0, 255],
    [0, 255],
  ])

const parseHsl = (input: string) =>
  parseComponents(input, hslColorRegex, [
    [0, 360],
    [0, 100],
    [0, 100],
  ])

const parseHsv = (input: string) =>
  parseComponents(input, hsvColorRegex, [
    [0, 360],
    [0, 100],
    [0, 100],
  ])

const parseCmyk = (input: string) =>
  parseComponents(input, cmykColorRegex, [
    [0, 100],
    [0, 100],
    [0, 100],
    [0, 100],
  ])

const parseLab = (input: string) =>
  parseComponents(input, labColorRegex, [
    [0, 100],
    [-Infinity, Infinity],
    [-Infinity, Infinity],
  ])

const parseLch = (input: string) =>
  parseComponents(input, lchColorRegex, [
    [0, 100],
    [0, Infinity],
    [0, 360],
  ])

const parseOklch = (input: string) =>
  parseComponents(input, oklchColorRegex, [
    [0, 100],
    [0, Infinity],
    [0, 360],
  ])

const parseOrThrow = (
  input: string,
  valueType: string,
  parser: (value: string) => number[] | null,
): number[] => {
  const value = input.trim()
  const components = parser(value)
  if (!components) {
    throw new Error(`Invalid ${valueType} color: ${value}`)
  }
  return components
}

export const isValidHexColor = (input: string): boolean => {
  const hexColorRegex = /^#?(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/
  return hexColorRegex.test(input.trim())
}

export const isValidRgbColor = (input: string): boolean => parseRgb(input) !== null

export const isValidHslColor = (input: string): boolean => parseHsl(input) !== null

export const isValidHsvColor = (input: string): boolean => parseHsv(input) !== null

export const isValidCmykColor = (input: string): boolean => parseCmyk(input) !== null

export const isValidLabColor = (input: string): boolean => parseLab(input) !== null

export const isValidLchColor = (input: string): boolean => parseLch(input) !== null

export const isValidOklchColor = (input: string): boolean => parseOklch(input) !== null

export const isValidNumColor = (input: string): boolean => {
  const value = input.trim()
  if (!/^\d+$/.test(value)) {
    return false
  }

  const colorNumber = Number(value)
  return Number.isSafeInteger(colorNumber) && colorNumber <= 0xffffff
}

export const stringToHex = (input: string): string => {
  const value = input.trim()
  if (!isValidHexColor(value)) {
    throw new Error(`Invalid hex color: ${value}`)
  }

  const hexLength = value.replace('#', '').length
  const outputMode = hexLength === 4 || hexLength === 8 ? 'rgba' : 'rgb'
  return chroma(value).hex(outputMode)
}

export const stringToRgb = (input: string): string => {
  const [red, green, blue] = parseOrThrow(input, 'rgb', parseRgb)
  return chroma.rgb(red, green, blue).hex()
}

export const stringToHsl = (input: string): string => {
  const [hue, saturation, lightness] = parseOrThrow(input, 'hsl', parseHsl)
  return chroma.hsl(hue, saturation / 100, lightness / 100).hex()
}

export const stringToHsv = (input: string): string => {
  const [hue, saturation, value] = parseOrThrow(input, 'hsv', parseHsv)
  return chroma.hsv(hue, saturation / 100, value / 100).hex()
}

export const stringToCmyk = (input: string): string => {
  const [cyan, magenta, yellow, key] = parseOrThrow(input, 'cmyk', parseCmyk)
  return chroma.cmyk(cyan / 100, magenta / 100, yellow / 100, key / 100).hex()
}

export const stringToLab = (input: string): string => {
  const [lightness, a, b] = parseOrThrow(input, 'lab', parseLab)
  return chroma.lab(lightness, a, b).hex()
}

export const stringToLch = (input: string): string => {
  const [lightness, chromaValue, hue] = parseOrThrow(input, 'lch', parseLch)
  return chroma.lch(lightness, chromaValue, hue).hex()
}

export const stringToOklch = (input: string): string => {
  const [lightness, chromaValue, hue] = parseOrThrow(input, 'oklch', parseOklch)
  return chroma.oklch(lightness / 100, chromaValue, hue).hex()
}

export const stringToNum = (input: string): string => {
  const value = input.trim()
  if (!isValidNumColor(value)) {
    throw new Error(`Invalid num color: ${value}`)
  }

  return chroma(Number(value)).hex()
}

export const colorValueParsers = {
  hex: stringToHex,
  rgb: stringToRgb,
  hsl: stringToHsl,
  hsv: stringToHsv,
  cmyk: stringToCmyk,
  lab: stringToLab,
  lch: stringToLch,
  oklch: stringToOklch,
  num: stringToNum,
} as const

export type ColorValueTypeId = keyof typeof colorValueParsers

const splitColorValues = (input: string): string[] => {
  const values: string[] = []
  let parenthesesDepth = 0
  let valueStart = 0

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]

    if (character === '(') {
      parenthesesDepth += 1
    } else if (character === ')') {
      parenthesesDepth -= 1
    }

    const isSeparator = character === ',' || /\s/.test(character)
    if (parenthesesDepth === 0 && isSeparator) {
      const value = input.slice(valueStart, index).trim()
      if (value) {
        values.push(value)
      }
      valueStart = index + 1
    }
  }

  const finalValue = input.slice(valueStart).trim()
  if (finalValue) {
    values.push(finalValue)
  }

  return values
}

export const parseColorValues = (input: string, valueType: ColorValueTypeId): string[] => {
  const values = splitColorValues(input)
  if (values.length === 0) {
    throw new Error('No color values found')
  }

  return values.map(colorValueParsers[valueType])
}

export const parseColorsToSearchParams = (colors: Color[]): string => {
  return colors.map((color) => color.value.replace(/^#/, '').toLowerCase()).join('-')
}
