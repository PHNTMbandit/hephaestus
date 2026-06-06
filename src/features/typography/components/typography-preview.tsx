import { cn } from 'dawn-ui-react'
import { motion } from 'motion/react'
import React from 'react'
import WebFont from 'webfontloader'
import { fontWeights, typeSteps } from '../typography.constants'
import { useTypography } from './typography-provider'

import type { WebFont as WebFontType } from '../types/font-family'

type TypographyPreviewProps = React.ComponentProps<'div'>

export const TypographyPreview = ({
  className,
  children,
  ref,
  ...props
}: TypographyPreviewProps) => {
  const { state } = useTypography()
  const fontStyle = state.fontStyle as WebFontType | null | undefined
  const fontFamily = fontStyle?.family ?? 'sans-serif'

  React.useEffect(() => {
    if (!fontStyle?.family) {
      return
    }

    WebFont.load({
      google: {
        families: [`${fontStyle.family}:${Object.keys(fontWeights).join(',')}`],
      },
    })
  }, [fontStyle?.family])

  return (
    <div
      style={{
        backgroundColor: state.background,
      }}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      <ul>
        {typeSteps.map(({ index, step }) => {
          const fontSize = state.fontSize * Math.pow(state.scale.ratio, step)
          return (
            <li key={index}>
              <motion.p
                animate={{
                  fontSize: fontSize,
                  color: state.colour,
                  fontWeight: state.fontWeight.weight,
                  letterSpacing: state.letterSpacing,
                  lineHeight: state.lineHeight,
                }}
                style={{
                  color: state.colour,
                  fontSize: `${fontSize}px`,
                  fontFamily,
                  fontWeight: state.fontWeight.weight,
                  letterSpacing: `${state.letterSpacing}px`,
                  lineHeight: state.lineHeight,
                }}
              >
                {`Heading ${step} - Font Size: ${fontSize.toFixed(2)}px`}
              </motion.p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
