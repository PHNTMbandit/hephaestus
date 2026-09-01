import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { anchoredToastManager, Button, cn } from 'dawn-ui-react'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

type PaletteAccessibilityCopyProps = React.ComponentProps<typeof Button> & {
  value: string
}

export const PaletteAccessibilityCopy = ({
  value,
  className,
  children,
  ...props
}: PaletteAccessibilityCopyProps) => {
  const buttonRef = React.useRef<HTMLButtonElement | null>(null)
  const [copied, setCopied] = React.useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value)

      if (copied) return

      setCopied(true)
      anchoredToastManager.add({
        description: 'Copied!',
        variant: 'success',
        icon: CheckIcon,
        positionerProps: { anchor: buttonRef.current, sideOffset: 8 },
        timeout: 2000,
        onClose: () => setCopied(false),
      })
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      tone="neutral"
      variant="ghost"
      size="small"
      className={cn('shrink-0 [&>svg]:shrink-0', className)}
      {...props}
    >
      {children}
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            <CheckIcon weight="bold" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            <CopyIcon weight="bold" />
          </motion.div>
        )}
      </AnimatePresence>
      {value}
    </Button>
  )
}
