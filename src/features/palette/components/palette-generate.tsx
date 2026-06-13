import { ArrowsClockwiseIcon } from '@phosphor-icons/react/dist/ssr'
import { useHotkey } from '@tanstack/react-hotkeys'
import { Button, cn, Kbd } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

type PaletteGenerateProps = React.ComponentProps<'button'>

export const PaletteGenerate = ({ className, children, ref, ...props }: PaletteGenerateProps) => {
  const { dispatch } = usePalette()
  useHotkey('Space', () => {
    dispatch({ type: 'GENERATE' })
  })

  const handleClick = () => {
    dispatch({ type: 'GENERATE' })
  }

  return (
    <Button className={cn('', className)} ref={ref} {...props} onClick={handleClick}>
      <ArrowsClockwiseIcon weight="bold" />
      <span className="hidden xl:block">Generate</span>
      <Kbd className="hidden xl:flex">
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <title>ic_fluent_spacebar_24_filled</title>
          <desc>Created with Sketch.</desc>
          <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="ic_fluent_spacebar_24_filled" fill="var(--color-on-surface)" fillRule="nonzero">
              <path
                d="M20,11 L20,13 L4,13 L4,11 C4,10.4477153 3.55228475,10 3,10 C2.44771525,10 2,10.4477153 2,11 L2,13 C2,14.1045695 2.8954305,15 4,15 L20,15 C21.1045695,15 22,14.1045695 22,13 L22,11 C22,10.4477153 21.5522847,10 21,10 C20.4477153,10 20,10.4477153 20,11 Z"
                id="🎨-Color"
              ></path>
            </g>
          </g>
        </svg>
      </Kbd>
      {children}
    </Button>
  )
}
