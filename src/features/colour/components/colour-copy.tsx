import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import chroma from 'chroma-js'
import { anchoredToastManager, Button, cn } from 'dawn-ui-react'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'
import { getForeground } from '../utils/accessibility'
import { useColour } from './colour-provider'

type ColourCopyProps = React.ComponentProps<'button'> & {
  value?: string
}

export const ColourCopy = ({ value, className, children, ...props }: ColourCopyProps) => {
  const [showingToast, setShowingToast] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const { colour } = useColour()
  const chromaColour = chroma(colour.value)
  const isDark = chromaColour.luminance() < 0.5

  const handleClick = async () => {
    try {
      if (!value) return
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
        backgroundColor: isDark
          ? chromaColour.brighten(0.75).hex()
          : chromaColour.darken(0.75).hex(),
        color: getForeground(colour.value),
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
            <CheckIcon />
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
            <CopyIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
