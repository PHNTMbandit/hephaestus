import { describe, expect, it } from 'vitest'
import { normalizeColorNameHex } from '../utils/queries'

describe('normalizeColorNameHex', () => {
  it.each([
    ['#f00', 'ff0000'],
    ['#f00f', 'ff0000'],
    ['#ff0000', 'ff0000'],
    ['#ff0000ff', 'ff0000'],
    ['FF000080', 'ff0000'],
  ])('normalizes %s for color name lookup', (input, expected) => {
    expect(normalizeColorNameHex(input)).toBe(expected)
  })
})
