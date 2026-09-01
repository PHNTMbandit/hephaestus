import { describe, expect, it } from 'vitest'
import { wcag2Algorithm } from '../algorithms/wcag2'

describe('wcag2Algorithm.calculate', () => {
  it('returns the maximum ratio for black on white', () => {
    expect(wcag2Algorithm.calculate('#000000', '#ffffff')).toBeCloseTo(21, 5)
  })

  it('returns 1 for identical colors', () => {
    expect(wcag2Algorithm.calculate('#123456', '#123456')).toBeCloseTo(1, 5)
  })

  it('is symmetric regardless of argument order', () => {
    const forward = wcag2Algorithm.calculate('#ff0000', '#ffffff')
    const reverse = wcag2Algorithm.calculate('#ffffff', '#ff0000')
    expect(forward).toBeCloseTo(reverse, 10)
  })
})

describe('wcag2Algorithm.formatScore', () => {
  it('formats to two decimals with a ratio suffix', () => {
    expect(wcag2Algorithm.formatScore(21)).toBe('21.00 : 1')
    expect(wcag2Algorithm.formatScore(4.5)).toBe('4.50 : 1')
  })
})

describe('wcag2Algorithm.normalizeScore', () => {
  it('maps the 1–21 range onto 0–1', () => {
    expect(wcag2Algorithm.normalizeScore(1)).toBe(0)
    expect(wcag2Algorithm.normalizeScore(11)).toBe(0.5)
    expect(wcag2Algorithm.normalizeScore(21)).toBe(1)
  })

  it('clamps out-of-range scores', () => {
    expect(wcag2Algorithm.normalizeScore(0)).toBe(0)
    expect(wcag2Algorithm.normalizeScore(100)).toBe(1)
  })
})

describe('wcag2Algorithm.evaluate', () => {
  it('grades normal text against AA and AAA thresholds', () => {
    expect(wcag2Algorithm.evaluate(21, 'normal')).toStrictEqual({ level: 'AAA', passes: true })
    expect(wcag2Algorithm.evaluate(4.5, 'normal')).toStrictEqual({ level: 'AA', passes: true })
    expect(wcag2Algorithm.evaluate(3, 'normal')).toStrictEqual({ level: 'Fail', passes: false })
  })

  it('grades large text against its lower thresholds', () => {
    expect(wcag2Algorithm.evaluate(4.5, 'large')).toStrictEqual({ level: 'AAA', passes: true })
    expect(wcag2Algorithm.evaluate(3, 'large')).toStrictEqual({ level: 'AA', passes: true })
    expect(wcag2Algorithm.evaluate(2.9, 'large')).toStrictEqual({ level: 'Fail', passes: false })
  })
})

describe('wcag2Algorithm.requirements', () => {
  it('passes every check at maximum contrast', () => {
    const requirements = wcag2Algorithm.requirements(21)
    const allChecks = requirements.flatMap((requirement) => requirement.checks)

    expect(requirements.map((requirement) => requirement.id)).toStrictEqual([
      'normal',
      'large',
      'non-text',
    ])
    expect(allChecks.every((check) => check.passes)).toBe(true)
  })

  it('fails text checks but not nothing at minimum contrast', () => {
    const requirements = wcag2Algorithm.requirements(1)
    const normal = requirements.find((requirement) => requirement.id === 'normal')

    expect(normal?.checks.every((check) => check.passes)).toBe(false)
  })
})
