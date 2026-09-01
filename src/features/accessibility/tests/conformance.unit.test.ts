import { describe, expect, it } from 'vitest'
import { getConformanceStatus } from '../utils/conformance'

import type { ConformanceCheck } from '../types/algorithm'

const check = (passes: boolean): ConformanceCheck => ({
  label: 'AA',
  threshold: '4.5:1',
  passes,
})

describe('getConformanceStatus', () => {
  it('returns "pass" when every check passes', () => {
    expect(getConformanceStatus([check(true), check(true)])).toBe('pass')
  })

  it('returns "fail" when no check passes', () => {
    expect(getConformanceStatus([check(false), check(false)])).toBe('fail')
  })

  it('returns "partial" when some checks pass', () => {
    expect(getConformanceStatus([check(true), check(false)])).toBe('partial')
  })

  it('treats an empty check list as a failure', () => {
    expect(getConformanceStatus([])).toBe('fail')
  })
})
