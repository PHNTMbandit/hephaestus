import chroma from 'chroma-js'
import { describe, expect, it } from 'vitest'
import {
  generateComplementaryColor,
  generateComplementaryPalette,
  generateInbetweenColor,
  generateMonochromaticColor,
  generateMonochromaticPalette,
  generateRandomColor,
} from '../utils/color-generators'

import type { Color } from '../../color/color.types'

const isHex = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value)

describe('generateRandomColor', () => {
  it('produces an unlocked color with a unique id and valid hex', () => {
    const first = generateRandomColor()
    const second = generateRandomColor()

    expect(first.locked).toBe(false)
    expect(isHex(first.value)).toBe(true)
    expect(first.id).not.toBe(second.id)
  })
})

describe('generateComplementaryColor', () => {
  it('rotates the hue by 180 degrees', () => {
    const base = '#ff0000'
    const complementary = generateComplementaryColor(base)

    const baseHue = chroma(base).get('hsl.h')
    const complementHue = chroma(complementary.value).get('hsl.h')

    expect((complementHue - baseHue + 360) % 360).toBeCloseTo(180, 0)
    expect(isHex(complementary.value)).toBe(true)
  })
})

describe('generateComplementaryPalette', () => {
  it('alternates between the base and its complement', () => {
    const base = '#ff0000'
    const complementary = generateComplementaryColor(base).value
    const palette = generateComplementaryPalette(base, 4)

    expect(palette).toHaveLength(4)
    expect(palette[0].value).toBe(base)
    expect(palette[1].value).toBe(complementary)
    expect(palette[2].value).toBe(base)
    expect(palette[3].value).toBe(complementary)
  })
})

describe('generateMonochromaticColor', () => {
  it('keeps the hue and only varies lightness', () => {
    const base = '#3366cc'
    const dark = generateMonochromaticColor(base, 0, 5)
    const light = generateMonochromaticColor(base, 4, 5)

    expect(chroma(dark.value).get('hsl.h')).toBeCloseTo(chroma(base).get('hsl.h'), 0)
    expect(chroma(light.value).get('hsl.l')).toBeGreaterThan(chroma(dark.value).get('hsl.l'))
  })

  it('clamps lightness within the valid range', () => {
    const color = generateMonochromaticColor('#000000', 0, 5)
    const lightness = chroma(color.value).get('hsl.l')

    expect(lightness).toBeGreaterThanOrEqual(0)
    expect(lightness).toBeLessThanOrEqual(1)
  })
})

describe('generateMonochromaticPalette', () => {
  it('returns the requested number of colors', () => {
    expect(generateMonochromaticPalette('#3366cc', 6)).toHaveLength(6)
  })

  it('includes the base color for both even and odd counts', () => {
    const base = '#3366cc'
    const baseHex = chroma(base).hex()

    expect(generateMonochromaticPalette(base, 6).map((c) => c.value)).toContain(baseHex)
    expect(generateMonochromaticPalette(base, 5).map((c) => c.value)).toContain(baseHex)
  })
})

describe('generateInbetweenColor', () => {
  it('mixes with the previous color when one exists', () => {
    const colors: Color[] = [
      { id: 'a', value: '#000000', locked: false },
      { id: 'b', value: '#ffffff', locked: false },
    ]

    const mixed = generateInbetweenColor(colors, 1)
    const expected = chroma.mix('#ffffff', '#000000', 0.5).hex()

    expect(mixed.value).toBe(expected)
    expect(mixed.locked).toBe(false)
  })

  it('mixes with the next color when there is no previous color', () => {
    const colors: Color[] = [
      { id: 'a', value: '#000000', locked: false },
      { id: 'b', value: '#ffffff', locked: false },
    ]

    const mixed = generateInbetweenColor(colors, 0)
    const expected = chroma.mix('#000000', '#ffffff', 0.5).hex()

    expect(mixed.value).toBe(expected)
  })
})
