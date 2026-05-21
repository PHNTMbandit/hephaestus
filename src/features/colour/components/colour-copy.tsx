import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { anchoredToastManager, Button, cn } from 'dawn-ui-react'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { usePalette } from '#/features/palette/hooks/use-palette.ts'
import { useColour } from './colour-provider'

type ColourCopyProps = React.ComponentProps<'button'>

export const ColourCopy = ({ className, children, ...props }: ColourCopyProps) => {
  const [showingToast, setShowingToast] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const { colour } = useColour()
  const { state } = usePalette()
  const chromaColour = chroma(colour.hex)
  const value = state.valueType.copyToClipboard(colour.hex)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value)

      if (showingToast) return

      setShowingToast(true)
      anchoredToastManager.add({
        description: 'Copied!',
        variant: 'success',
        icon: CheckIcon,
        positionerProps: {
          anchor: buttonRef.current,
          sideOffset: 8,
        },
        timeout: 2000,
        onClose: () => setShowingToast(false),
      })
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      anchoredToastManager.add({
        description: 'Failed to copy',
        variant: 'error',
        positionerProps: {
          anchor: buttonRef.current,
          sideOffset: 8,
        },
        timeout: 2000,
        onClose: () => setShowingToast(false),
      })
    }
  }

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      style={{
        backgroundColor: chromaColour.darken().hex(),
        color: chromaColour.luminance() > 0.5 ? 'black' : 'white',
      }}
      tone="neutral"
      variant={'ghost'}
      size="iconMedium"
      className={cn(
        'opacity-0 transition-all not-hover:bg-transparent! group-hover:opacity-100 [&>svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
      <AnimatePresence mode="wait" initial={false}>
        {showingToast ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.15,
            }}
          >
            <CheckIcon weight="bold" className="" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              duration: 0.15,
            }}
          >
            <CopyIcon weight="bold" className="" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
