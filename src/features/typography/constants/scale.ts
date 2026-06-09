import type { TypeScale, TypographyScaleType } from '../types/type-scale'

export const typeScales: Record<TypographyScaleType, TypeScale> = {
  minorSecond: {
    id: 0,
    name: 'Minor Second',
    ratio: 1.067,
  },
  majorSecond: {
    id: 1,
    name: 'Major Second',
    ratio: 1.125,
  },
  minorThird: {
    id: 2,
    name: 'Minor Third',
    ratio: 1.2,
  },
  majorThird: {
    id: 3,
    name: 'Major Third',
    ratio: 1.25,
  },
  perfectFourth: {
    id: 4,
    name: 'Perfect Fourth',
    ratio: 1.333,
  },
  augmentedFourth: {
    id: 5,
    name: 'Augmented Fourth',
    ratio: 1.414,
  },
  perfectFifth: {
    id: 6,
    name: 'Perfect Fifth',
    ratio: 1.5,
  },
  goldenRatio: {
    id: 7,
    name: 'Golden Ratio',
    ratio: 1.618,
  },
}

export const typeSteps = [
  {
    index: 0,
    step: -2,
  },
  {
    index: 1,
    step: -1,
  },
  {
    index: 2,
    step: 0,
  },
  {
    index: 3,
    step: 1,
  },
  {
    index: 4,
    step: 2,
  },
  {
    index: 5,
    step: 3,
  },
  {
    index: 6,
    step: 4,
  },
  {
    index: 7,
    step: 5,
  },
]
