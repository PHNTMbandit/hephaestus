import chroma from 'chroma-js'

import type { ValueType } from '../palette.types'

/** Rounds a number to specified decimal places */
const round = (value: number, decimals = 2) => Math.round(value * 10 ** decimals) / 10 ** decimals

export const valueTypes = {
  hex: {
    value: 'hex',
    label: 'HEX',
    displayColor: (colour: string) => chroma(colour).hex().replace('#', '').toUpperCase(),
    getColorClipboardFormat: (colour: string) => chroma(colour).hex(),
  },
  rgb: {
    value: 'rgb',
    label: 'RGB',
    displayColor: (colour: string) => chroma(colour).rgb().join(', '),
    getColorClipboardFormat: (colour: string) => `rgb(${chroma(colour).rgb().join(' ')})`,
  },
  hsl: {
    value: 'hsl',
    label: 'HSL',
    displayColor: (colour: string) => {
      const [h, s, l] = chroma(colour).hsl()
      return `${round(h)}°, ${round(s * 100)}%, ${round(l * 100)}%`
    },
    getColorClipboardFormat: (colour: string) => {
      const [h, s, l] = chroma(colour).hsl()
      return `hsl(${round(h)} ${round(s * 100)}% ${round(l * 100)}%)`
    },
  },
  hsv: {
    value: 'hsv',
    label: 'HSV',
    displayColor: (colour: string) => {
      const [h, s, v] = chroma(colour).hsv()
      return `${round(h)}°, ${round(s * 100)}%, ${round(v * 100)}%`
    },
    getColorClipboardFormat: (colour: string) => {
      const [h, s, v] = chroma(colour).hsv()
      return `color(hsv ${round(h)} ${round(s * 100)}% ${round(v * 100)}%)`
    },
  },
  cmyk: {
    value: 'cmyk',
    label: 'CMYK',
    displayColor: (colour: string) => {
      const [c, m, y, k] = chroma(colour).cmyk()
      return `${round(c * 100)}%, ${round(m * 100)}%, ${round(y * 100)}%, ${round(k * 100)}%`
    },
    getColorClipboardFormat: (colour: string) => {
      const [c, m, y, k] = chroma(colour).cmyk()
      return `device-cmyk(${round(c * 100)}% ${round(m * 100)}% ${round(y * 100)}% ${round(k * 100)}%)`
    },
  },
  lab: {
    value: 'lab',
    label: 'LAB',
    displayColor: (colour: string) => {
      const [l, a, b] = chroma(colour).lab()
      return `${round(l)}, ${round(a)}, ${round(b)}`
    },
    getColorClipboardFormat: (colour: string) => {
      const [l, a, b] = chroma(colour).lab()
      return `lab(${round(l)}% ${round(a)} ${round(b)})`
    },
  },
  lch: {
    value: 'lch',
    label: 'LCH',
    displayColor: (colour: string) => {
      const [l, c, h] = chroma(colour).lch()
      return `${round(l)}, ${round(c)}, ${round(h)}°`
    },
    getColorClipboardFormat: (colour: string) => {
      const [l, c, h] = chroma(colour).lch()
      return `lch(${round(l)}% ${round(c)} ${round(h)})`
    },
  },
  oklch: {
    value: 'oklch',
    label: 'OKLCH',
    displayColor: (colour: string) => {
      const [l, c, h] = chroma(colour).oklch()
      return `${round(l * 100)}%, ${round(c, 3)}, ${round(h)}°`
    },
    getColorClipboardFormat: (colour: string) => {
      const [l, c, h] = chroma(colour).oklch()
      return `oklch(${round(l * 100)}% ${round(c, 3)} ${round(h)})`
    },
  },
  num: {
    value: 'num',
    label: 'NUM',
    displayColor: (colour: string) => chroma(colour).num().toLocaleString(),
    getColorClipboardFormat: (colour: string) => chroma(colour).num().toString(),
  },
} as const satisfies Record<string, ValueType>

export type ValueTypeId = keyof typeof valueTypes

export const valueTypesList = Object.values(valueTypes) as ValueType[]
