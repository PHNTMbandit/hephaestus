import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'dawn-ui-react'
import { usePalette } from '../hooks/use-palette'

const nameVariants = cva('', {
  variants: {
    size: {
      small: '',
      medium: '',
      large: '',
      xlarge: '',
      xxlarge: '',
    },
    variant: {
      default: '',
      strong: '',
    },
  },
  compoundVariants: [
    {
      size: 'small',
      variant: 'default',
      className: 'style-text-default--1',
    },
    {
      size: 'small',
      variant: 'strong',
      className: 'style-text-strong--1',
    },
    {
      size: 'medium',
      variant: 'default',
      className: 'style-text-default-0',
    },
    {
      size: 'medium',
      variant: 'strong',
      className: 'style-text-strong-0',
    },
    {
      size: 'large',
      variant: 'default',
      className: 'style-text-default-1',
    },
    {
      size: 'large',
      variant: 'strong',
      className: 'style-text-strong-1',
    },
    {
      size: 'xlarge',
      variant: 'default',
      className: 'style-text-default-2',
    },
    {
      size: 'xlarge',
      variant: 'strong',
      className: 'style-text-strong-2',
    },
    {
      size: 'xxlarge',
      variant: 'default',
      className: 'style-text-default-3',
    },
    {
      size: 'xxlarge',
      variant: 'strong',
      className: 'style-text-strong-3',
    },
  ],
  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
})

type PaletteNameProps = React.ComponentProps<'span'> & VariantProps<typeof nameVariants>

export const PaletteName = ({
  size,
  variant,
  className,
  children,
  ref,
  ...props
}: PaletteNameProps) => {
  const { state } = usePalette()

  return (
    <span className={cn(nameVariants({ size, variant, className }))} ref={ref} {...props}>
      {children}
      {<span>{state.name}</span>}
    </span>
  )
}
