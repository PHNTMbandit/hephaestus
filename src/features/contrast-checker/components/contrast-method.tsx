import { cn, Tabs, TabsIndicator, TabsList, TabsTab } from 'dawn-ui-react'
import { CONTRAST_ALGORITHMS } from '../algorithms'
import { useContrastChecker } from '../hooks/use-contrast-checker'

import type { ContrastMethod as ContrastMethodValue } from '../types/methods'

type ContrastMethodProps = React.ComponentProps<typeof Tabs>

export const ContrastMethod = ({ className, children, ref, ...props }: ContrastMethodProps) => {
  const { state, dispatch } = useContrastChecker()

  const handleChange = (value: string) => {
    dispatch({
      type: 'SET_CONTRAST_METHOD',
      payload: { contrastMethod: value as ContrastMethodValue },
    })
  }

  return (
    <Tabs
      variant="underline"
      value={state.contrastMethod}
      onValueChange={handleChange}
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      <TabsList className="w-full">
        {Object.values(CONTRAST_ALGORITHMS).map((algorithm) => (
          <TabsTab key={algorithm.method} value={algorithm.method} className="flex-1">
            {algorithm.label}
          </TabsTab>
        ))}
        <TabsIndicator />
      </TabsList>
      {children}
    </Tabs>
  )
}
