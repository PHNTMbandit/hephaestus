import { describe, expect, it } from 'vitest'
import { apcaAlgorithm } from '../algorithms/apca'

describe('apcaAlgorithm.calculate', () => {
  it('produces positive Lc for dark text on a light background', () => {
    const lc = apcaAlgorithm.calculate('#000000', '#ffffff')
    expect(lc).toBeGreaterThan(100)
    expect(lc).toBeLessThanOrEqual(108)
  })

  it('produces negative Lc for light text on a dark background', () => {
    const lc = apcaAlgorithm.calculate('#ffffff', '#000000')
    expect(lc).toBeLessThan(-100)
    expect(Math.abs(lc)).toBeLessThanOrEqual(110)
  })

  it('returns 0 when the colors are identical', () => {
    expect(apcaAlgorithm.calculate('#777777', '#777777')).toBe(0)
  })
})

describe('apcaAlgorithm.formatScore', () => {
  it('rounds and prefixes with Lc', () => {
    expect(apcaAlgorithm.formatScore(75.4)).toBe('Lc 75')
    expect(apcaAlgorithm.formatScore(-107.9)).toBe('Lc -108')
  })
})

describe('apcaAlgorithm.normalizeScore', () => {
  it('maps absolute Lc onto 0–1', () => {
    expect(apcaAlgorithm.normalizeScore(0)).toBe(0)
    expect(apcaAlgorithm.normalizeScore(54)).toBeCloseTo(0.5, 5)
    expect(apcaAlgorithm.normalizeScore(108)).toBe(1)
  })

  it('uses magnitude so polarity does not change the result', () => {
    expect(apcaAlgorithm.normalizeScore(-108)).toBe(1)
  })

  it('clamps beyond the range', () => {
    expect(apcaAlgorithm.normalizeScore(200)).toBe(1)
  })
})

describe('apcaAlgorithm.evaluate', () => {
  it('grades normal text against preferred and minimum targets', () => {
    expect(apcaAlgorithm.evaluate(90, 'normal')).toStrictEqual({ level: 'Preferred', passes: true })
    expect(apcaAlgorithm.evaluate(75, 'normal')).toStrictEqual({ level: 'Minimum', passes: true })
    expect(apcaAlgorithm.evaluate(74, 'normal')).toStrictEqual({ level: 'Fail', passes: false })
  })

  it('grades large text against its lower targets', () => {
    expect(apcaAlgorithm.evaluate(75, 'large')).toStrictEqual({ level: 'Preferred', passes: true })
    expect(apcaAlgorithm.evaluate(60, 'large')).toStrictEqual({ level: 'Minimum', passes: true })
    expect(apcaAlgorithm.evaluate(59, 'large')).toStrictEqual({ level: 'Fail', passes: false })
  })

  it('ignores polarity when grading', () => {
    expect(apcaAlgorithm.evaluate(-90, 'normal')).toStrictEqual({
      level: 'Preferred',
      passes: true,
    })
  })
})

describe('apcaAlgorithm.requirements', () => {
  it('passes every tier at high Lc', () => {
    const requirements = apcaAlgorithm.requirements(90)
    const allChecks = requirements.flatMap((requirement) => requirement.checks)

    expect(requirements.map((requirement) => requirement.id)).toStrictEqual([
      'body',
      'large-text',
      'headline',
      'non-text',
    ])
    expect(allChecks.every((check) => check.passes)).toBe(true)
  })

  it('evaluates tiers on magnitude for negative Lc', () => {
    const requirements = apcaAlgorithm.requirements(-45)
    const headline = requirements.find((requirement) => requirement.id === 'headline')
    const body = requirements.find((requirement) => requirement.id === 'body')

    expect(headline?.checks[0].passes).toBe(true)
    expect(body?.checks.every((check) => check.passes)).toBe(false)
  })
})
