import chroma from 'chroma-js'

import type { ValueType } from '../palette.types'

export const valueTypes = {
  hex: {
    value: 'hex',
    label: 'HEX',
    render: (colour: string) => chroma(colour).hex().split('#')[1],
    copyToClipboard: (colour: string) => chroma(colour).hex(),
  },
  rgb: {
    value: 'rgb',
    label: 'RGB',
    render: (colour: string) => chroma(colour).rgb().join(', '),
    copyToClipboard: (colour: string) => `rgb(${chroma(colour).rgb().join(', ')})`,
  },
  hsl: {
    value: 'hsl',
    label: 'HSL',
    render: (colour: string) =>
      chroma(colour)
        .hsl()
        .map((value) => Math.round(value * 100) / 100)
        .join(', '),
    copyToClipboard: (colour: string) =>
      `hsl(${chroma(colour)
        .hsl()
        .map((value) => Math.round(value * 100) / 100)
        .join(', ')})`,
  },
  hsv: {
    value: 'hsv',
    label: 'HSV',
    render: (colour: string) =>
      chroma(colour)
        .hsv()
        .map((value) => Math.round(value * 100) / 100)
        .join(', '),
    copyToClipboard: (colour: string) =>
      `hsv(${chroma(colour)
        .hsv()
        .map((value) => Math.round(value * 100) / 100)
        .join(', ')})`,
  },
  cmyk: {
    value: 'cmyk',
    label: 'CMYK',
    render: (colour: string) =>
      chroma(colour)
        .cmyk()
        .map((value) => Math.round(value * 100))
        .join(', '),
    copyToClipboard: (colour: string) =>
      `cmyk(${chroma(colour)
        .cmyk()
        .map((value) => Math.round(value * 100))
        .join(', ')})`,
  },
  lab: {
    value: 'lab',
    label: 'LAB',
    render: (colour: string) =>
      chroma(colour)
        .lab()
        .map((value) => Math.round(value * 100) / 100)
        .join(', '),
    copyToClipboard: (colour: string) =>
      `lab(${chroma(colour)
        .lab()
        .map((value) => Math.round(value * 100) / 100)
        .join(', ')})`,
  },
  lch: {
    value: 'lch',
    label: 'LCH',
    render: (colour: string) =>
      chroma(colour)
        .lch()
        .map((value) => Math.round(value * 100) / 100)
        .join(', '),
    copyToClipboard: (colour: string) =>
      `lch(${chroma(colour)
        .lch()
        .map((value) => Math.round(value * 100) / 100)
        .join(', ')})`,
  },
  num: {
    value: 'num',
    label: 'NUM',
    render: (colour: string) => chroma(colour).num().toExponential(),
    copyToClipboard: (colour: string) => chroma(colour).num().toExponential(),
  },
} as const satisfies Record<string, ValueType>

export type ValueTypeId = keyof typeof valueTypes

export const valueTypesList = Object.values(valueTypes) as ValueType[]
