import { describe, expect, it } from 'vitest'
import { isHexColor, stringToHex } from '../utils/parse'

describe('Validate string into hex colors', () => {
  it('should parse a 6-digit hex color', () => {
    expect(isHexColor('#ff0000')).toBe(true)
  })

  it('should parse a 3-digit hex color', () => {
    expect(isHexColor('#f00')).toBe(true)
  })

  it('should parse a 4-digit hex color', () => {
    expect(isHexColor('#f00f')).toBe(true)
  })

  it('should parse uppercase hex colors', () => {
    expect(isHexColor('#FF0000')).toBe(true)
  })

  it('should parse a 8-digit hex color', () => {
    expect(isHexColor('#ff0000ff')).toBe(true)
  })

  it('should parse a hex color without #', () => {
    expect(isHexColor('ff0000')).toBe(true)
  })

  it('should not parse an invalid hex color', () => {
    expect(isHexColor('#ff000')).toBe(false)
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

describe('Parse text into hex colors', () => {
  it('should parse a string of hex colors separated by commas', () => {
    const input = '#ff0000, #00ff00, #0000ff'
    const expectedOutput = ['#ff0000', '#00ff00', '#0000ff']
    const output = input.split(',').map((color) => stringToHex(color.trim()))
    expect(output).toEqual(expectedOutput)
  })

  it('should parse a string of hex colors separated by spaces', () => {
    const input = '#ff0000 #00ff00 #0000ff'
    const expectedOutput = ['#ff0000', '#00ff00', '#0000ff']
    const output = input.split(' ').map((color) => stringToHex(color.trim()))
    expect(output).toEqual(expectedOutput)
  })

  it('should parse a string of hex colors separated by newlines', () => {
    const input = '#ff0000\n#00ff00\n#0000ff'
    const expectedOutput = ['#ff0000', '#00ff00', '#0000ff']
    const output = input.split('\n').map((color) => stringToHex(color.trim()))
    expect(output).toEqual(expectedOutput)
  })
})
