import { cn } from 'dawn-ui-react'
import { getContrastAlgorithm } from '#/features/accessibility/algorithms'
import { useContrastChecker } from '../hooks/use-contrast-checker'

type ContrastScoreProps = React.ComponentProps<'span'>

export const ContrastScore = ({ className, children, ref, ...props }: ContrastScoreProps) => {
  const { state } = useContrastChecker()
  const score = getContrastAlgorithm(state.contrastMethod).formatScore(state.contrastScore)

  return (
    <span className={cn('', className)} ref={ref} {...props}>
      {children}
      {score}
    </span>
  )
}
