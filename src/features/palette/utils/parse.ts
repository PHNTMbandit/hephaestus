export const isHexColor = (input: string): boolean => {
  const hexColorRegex = /^#?(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/
  return hexColorRegex.test(input.trim())
}

export const stringToHex = (input: string): string => {
  const value = input.trim()
  if (!isHexColor(value)) {
    throw new Error(`Invalid hex color: ${value}`)
  }

  const hexValue = value.replace('#', '').toLowerCase()

  if (hexValue.length === 3) {
    return `#${hexValue[0]}${hexValue[0]}${hexValue[1]}${hexValue[1]}${hexValue[2]}${hexValue[2]}`
  }

  if (hexValue.length === 4) {
    return `#${hexValue[0]}${hexValue[0]}${hexValue[1]}${hexValue[1]}${hexValue[2]}${hexValue[2]}${hexValue[3]}${hexValue[3]}`
  }

  return `#${hexValue}`
}
