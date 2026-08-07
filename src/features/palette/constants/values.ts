import chroma from 'chroma-js'

import type { ValueType } from '../types/value'

/** Rounds a number to specified decimal places */
const round = (value: number, decimals = 2) => Math.round(value * 10 ** decimals) / 10 ** decimals

export const valueTypes = {
  hex: {
    value: 'hex',
    label: 'HEX',
    displayColor: (color: string) => chroma(color).hex().replace('#', '').toUpperCase(),
    getColorClipboardFormat: (color: string) => chroma(color).hex(),
  },
  rgb: {
    value: 'rgb',
    label: 'RGB',
    displayColor: (color: string) => chroma(color).rgb().join(', '),
    getColorClipboardFormat: (color: string) => `rgb(${chroma(color).rgb().join(' ')})`,
  },
  hsl: {
    value: 'hsl',
    label: 'HSL',
    displayColor: (color: string) => {
      const [h, s, l] = chroma(color).hsl()
      return `${round(h)}°, ${round(s * 100)}%, ${round(l * 100)}%`
    },
    getColorClipboardFormat: (color: string) => {
      const [h, s, l] = chroma(color).hsl()
      return `hsl(${round(h)} ${round(s * 100)}% ${round(l * 100)}%)`
    },
  },
  hsv: {
    value: 'hsv',
    label: 'HSV',
    displayColor: (color: string) => {
      const [h, s, v] = chroma(color).hsv()
      return `${round(h)}°, ${round(s * 100)}%, ${round(v * 100)}%`
    },
    getColorClipboardFormat: (color: string) => {
      const [h, s, v] = chroma(color).hsv()
      return `color(hsv ${round(h)} ${round(s * 100)}% ${round(v * 100)}%)`
    },
  },
  cmyk: {
    value: 'cmyk',
    label: 'CMYK',
    displayColor: (color: string) => {
      const [c, m, y, k] = chroma(color).cmyk()
      return `${round(c * 100)}%, ${round(m * 100)}%, ${round(y * 100)}%, ${round(k * 100)}%`
    },
    getColorClipboardFormat: (color: string) => {
      const [c, m, y, k] = chroma(color).cmyk()
      return `device-cmyk(${round(c * 100)}% ${round(m * 100)}% ${round(y * 100)}% ${round(k * 100)}%)`
    },
  },
  lab: {
    value: 'lab',
    label: 'LAB',
    displayColor: (color: string) => {
      const [l, a, b] = chroma(color).lab()
      return `${round(l)}, ${round(a)}, ${round(b)}`
    },
    getColorClipboardFormat: (color: string) => {
      const [l, a, b] = chroma(color).lab()
      return `lab(${round(l)}% ${round(a)} ${round(b)})`
    },
  },
  lch: {
    value: 'lch',
    label: 'LCH',
    displayColor: (color: string) => {
      const [l, c, h] = chroma(color).lch()
      return `${round(l)}, ${round(c)}, ${round(h)}°`
    },
    getColorClipboardFormat: (color: string) => {
      const [l, c, h] = chroma(color).lch()
      return `lch(${round(l)}% ${round(c)} ${round(h)})`
    },
  },
  oklch: {
    value: 'oklch',
    label: 'OKLCH',
    displayColor: (color: string) => {
      const [l, c, h] = chroma(color).oklch()
      return `${round(l * 100)}%, ${round(c, 3)}, ${round(h)}°`
    },
    getColorClipboardFormat: (color: string) => {
      const [l, c, h] = chroma(color).oklch()
      return `oklch(${round(l * 100)}% ${round(c, 3)} ${round(h)})`
    },
  },
  num: {
    value: 'num',
    label: 'NUM',
    displayColor: (color: string) => chroma(color).num().toLocaleString(),
    getColorClipboardFormat: (color: string) => chroma(color).num().toString(),
  },
} as const satisfies Record<string, ValueType>

export type ValueTypeId = keyof typeof valueTypes

export const valueTypesList = Object.values(valueTypes) as ValueType[]
