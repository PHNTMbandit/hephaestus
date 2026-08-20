import { cn } from 'dawn-ui-react'
import { motion } from 'motion/react'
import { useContrastChecker } from '../hooks/use-contrast-checker'

type ContrastApcaFontProps = React.ComponentProps<'div'>

export const ContrastApcaFont = ({ className, children, ref, ...props }: ContrastApcaFontProps) => {
  const { state } = useContrastChecker()

  if (state.contrastMethod !== 'APCA') return null

  return (
    <div
      className={cn('flex flex-col gap-sm border-b border-border pb-md', className)}
      ref={ref}
      {...props}
    >
      {children}
      <div
        className="flex w-full items-center rounded-xl border border-border p-md"
        style={{ backgroundColor: state.backgroundColor, color: state.foregroundColor }}
      >
        <motion.p
          animate={{
            fontSize: `${state.fontSize}px`,
            color: state.foregroundColor,
            fontWeight: state.fontWeight,
          }}
          style={{
            fontSize: `${state.fontSize}px`,
            fontWeight: state.fontWeight,
            lineHeight: 1.3,
          }}
        >
          The quick brown fox jumps over the lazy dog
        </motion.p>
      </div>
    </div>
  )
}
