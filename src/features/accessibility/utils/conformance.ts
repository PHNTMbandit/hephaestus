import type { ConformanceCheck } from '../types/algorithm'

export type ConformanceStatus = 'pass' | 'partial' | 'fail'

export const getConformanceStatus = (checks: ConformanceCheck[]): ConformanceStatus => {
  const passed = checks.filter((check) => check.passes).length

  if (checks.length > 0 && passed === checks.length) return 'pass'
  if (passed === 0) return 'fail'
  return 'partial'
}
