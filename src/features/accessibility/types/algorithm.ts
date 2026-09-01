import type { ContrastMethod } from './methods'

export type TextSize = 'normal' | 'large'

export type ConformanceResult = {
  level: string
  passes: boolean
}

export type ContrastRequirementPreview = 'body' | 'large' | 'heading' | 'non-text'

export type ConformanceCheck = {
  label: string
  threshold: string
  passes: boolean
}

export type ContrastRequirement = {
  id: string
  label: string
  preview: ContrastRequirementPreview
  checks: ConformanceCheck[]
}

export type ContrastReference = {
  label: string
  url: string
}

export type ContrastAlgorithm = {
  method: ContrastMethod
  label: string
  description: string
  references: ContrastReference[]
  scoreRange: { min: number; max: number }
  calculate: (foreground: string, background: string) => number
  formatScore: (score: number) => string
  normalizeScore: (score: number) => number
  evaluate: (score: number, textSize: TextSize) => ConformanceResult
  requirements: (score: number) => ContrastRequirement[]
}
