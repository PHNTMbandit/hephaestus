import { describe, expect, it } from 'vitest'
import { valueTypes } from '../constants/values'
import {
  colorValueParsers,
  isValidCmykColor,
  isValidHexColor,
  isValidHslColor,
  isValidHsvColor,
  isValidLabColor,
  isValidLchColor,
  isValidNumColor,
  isValidOklchColor,
  isValidRgbColor,
  parseColorValues,
  stringToCmyk,
  stringToHex,
  stringToHsl,
  stringToHsv,
  stringToLab,
  stringToLch,
  stringToNum,
  stringToOklch,
  stringToRgb,
} from '../utils/parse'

describe('Validate string into hex colors', () => {
  it('should parse a 6-digit hex color', () => {
    expect(isValidHexColor('#ff0000')).toBe(true)
  })

  it('should parse a 3-digit hex color', () => {
    expect(isValidHexColor('#f00')).toBe(true)
  })

  it('should parse a 4-digit hex color', () => {
    expect(isValidHexColor('#f00f')).toBe(true)
  })

  it('should parse uppercase hex colors', () => {
    expect(isValidHexColor('#FF0000')).toBe(true)
  })

  it('should parse a 8-digit hex color', () => {
    expect(isValidHexColor('#ff0000ff')).toBe(true)
  })

  it('should parse a hex color without #', () => {
    expect(isValidHexColor('ff0000')).toBe(true)
  })

  it('should not parse an invalid hex color', () => {
    expect(isValidHexColor('#ff000')).toBe(false)
  })
})

describe('Parse string into hex color', () => {
  it('should parse a 3-digit hex color into 6-digit hex color', () => {
    expect(stringToHex('#f00')).toBe('#ff0000')
  })

  it('should parse a 4-digit hex color into 8-digit hex color', () => {
    expect(stringToHex('#f00f')).toBe('#ff0000ff')
  })

  it('should parse a 6-digit hex color into 6-digit hex color', () => {
    expect(stringToHex('#ff0000')).toBe('#ff0000')
  })

  it('should parse a 8-digit hex color into 8-digit hex color', () => {
    expect(stringToHex('#ff0000ff')).toBe('#ff0000ff')
  })

  it('should throw an error for an invalid hex color', () => {
    expect(() => stringToHex('#ff000')).toThrow('Invalid hex color: #ff000')
  })
})

describe('Parse remaining color value types', () => {
  it.each([
    ['RGB with spaces', 'rgb(255 0 0)', isValidRgbColor, stringToRgb],
    ['RGB with commas', 'rgb(255, 0, 0)', isValidRgbColor, stringToRgb],
    ['HSL', 'hsl(0 100% 50%)', isValidHslColor, stringToHsl],
    ['HSV', 'color(hsv 0 100% 100%)', isValidHsvColor, stringToHsv],
    ['CMYK', 'device-cmyk(0% 100% 100% 0%)', isValidCmykColor, stringToCmyk],
    ['LAB', 'lab(53.24% 80.09 67.2)', isValidLabColor, stringToLab],
    ['LCH', 'lch(53.24% 104.55 40)', isValidLchColor, stringToLch],
    ['OKLCH', 'oklch(62.8% 0.258 29.23)', isValidOklchColor, stringToOklch],
    ['NUM', '16711680', isValidNumColor, stringToNum],
  ])('should parse a valid %s color', (_, input, validator, parser) => {
    expect(validator(input)).toBe(true)
    expect(parser(input)).toBe('#ff0000')
  })

  it.each([
    ['RGB', 'rgb(256 0 0)', isValidRgbColor, stringToRgb],
    ['HSL', 'hsl(0 101% 50%)', isValidHslColor, stringToHsl],
    ['HSV', 'color(hsv -1 100% 100%)', isValidHsvColor, stringToHsv],
    ['CMYK', 'device-cmyk(0% 101% 100% 0%)', isValidCmykColor, stringToCmyk],
    ['LAB', 'lab(101% 0 0)', isValidLabColor, stringToLab],
    ['LCH', 'lch(50% -1 40)', isValidLchColor, stringToLch],
    ['OKLCH', 'oklch(101% 0.2 40)', isValidOklchColor, stringToOklch],
    ['NUM', '16777216', isValidNumColor, stringToNum],
  ])('should reject an out-of-range %s color', (valueType, input, validator, parser) => {
    expect(validator(input)).toBe(false)
    expect(() => parser(input)).toThrow(`Invalid ${valueType.toLowerCase()} color: ${input}`)
  })

  it.each(Object.entries(valueTypes))(
    'should round-trip the %s clipboard format',
    (valueType, config) => {
      const input = config.getColorClipboardFormat('#ff0000')
      const parser = colorValueParsers[valueType as keyof typeof colorValueParsers]

      expect(parser(input)).toBe('#ff0000')
    },
  )
})

describe('Parse text into hex colors', () => {
  it('should parse a string of hex colors separated by commas', () => {
    const input = '#ff0000, #00ff00, #0000ff'
    const expectedOutput = ['#ff0000', '#00ff00', '#0000ff']
    const output = parseColorValues(input, 'hex')
    expect(output).toEqual(expectedOutput)
  })

  it('should parse a string of hex colors separated by spaces', () => {
    const input = '#ff0000 #00ff00 #0000ff'
    const expectedOutput = ['#ff0000', '#00ff00', '#0000ff']
    const output = parseColorValues(input, 'hex')
    expect(output).toEqual(expectedOutput)
  })

  it('should parse a string of hex colors separated by newlines', () => {
    const input = '#ff0000\n#00ff00\n#0000ff'
    const expectedOutput = ['#ff0000', '#00ff00', '#0000ff']
    const output = parseColorValues(input, 'hex')
    expect(output).toEqual(expectedOutput)
  })

  it('should preserve commas and spaces inside functional colors', () => {
    const input = 'rgb(255, 0, 0), rgb(0, 255, 0)\nrgb(0 0 255)'

    expect(parseColorValues(input, 'rgb')).toEqual(['#ff0000', '#00ff00', '#0000ff'])
  })

  it('should parse multiple values using the selected color type', () => {
    const input = 'hsl(0 100% 50%) hsl(120 100% 50%)'

    expect(parseColorValues(input, 'hsl')).toEqual(['#ff0000', '#00ff00'])
  })

  it('should reject input without color values', () => {
    expect(() => parseColorValues('  \n ', 'hex')).toThrow('No color values found')
  })
})
