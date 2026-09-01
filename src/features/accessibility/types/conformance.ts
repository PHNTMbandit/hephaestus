export type WCAGConformance = {
  conformanceLevel: 'AAA' | 'AA' | 'Fail'
  minimumContrastRatios: {
    normal: number
    large: number
  }
}
