import { Badge, cn } from 'dawn-ui-react'
import { getWCAGRating } from '../utils/accessibility'
import { useColour } from './colour-provider'

type ColourWCAGProps = React.ComponentProps<typeof Badge> & {
  targetColour: string
}

export const ColourWCAG = ({
  targetColour,
  className,
  children,
  ref,
  ...props
}: ColourWCAGProps) => {
  const { colour } = useColour()
  const grade = getWCAGRating(colour.value, targetColour)

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
