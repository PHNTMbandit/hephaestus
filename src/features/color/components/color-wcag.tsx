import { Badge, cn } from 'dawn-ui-react'
import { getWCAGRating } from '../utils/accessibility'
import { useColor } from './color-provider'

type ColorWCAGProps = React.ComponentProps<typeof Badge> & {
  targetColor: string
}

export const ColorWCAG = ({ targetColor, className, children, ref, ...props }: ColorWCAGProps) => {
  const { color } = useColor()
  const grade = getWCAGRating(color.value, targetColor)

  return (
    <Badge
      tone={grade.label === 'Fail' ? 'error' : 'success'}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      {grade.label}
    </Badge>
  )
}
