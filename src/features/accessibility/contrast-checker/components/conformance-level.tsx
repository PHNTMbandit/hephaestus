import { cn } from 'dawn-ui-react'
import { getContrastAlgorithm } from '#/features/accessibility/algorithms'
import { useContrastChecker } from '../hooks/use-contrast-checker'

import type { TextSize } from '#/features/accessibility/types/algorithm'

type ConformanceLevelProps = React.ComponentProps<'span'> & {
  textSize?: TextSize
}

export const ConformanceLevel = ({
  className,
  children,
  textSize = 'normal',
  ref,
  ...props
}: ConformanceLevelProps) => {
  const { state } = useContrastChecker()
  const { level } = getContrastAlgorithm(state.contrastMethod).evaluate(
    state.contrastScore,
    textSize,
  )

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {level}
    </span>
  )
}
