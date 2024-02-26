import type { PropsWithChildren } from 'react'
import { forwardRef, useMemo } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { type VariantProps, cva } from 'class-variance-authority'
import { cssInterop } from 'react-native-css-interop'
import { omitImpl, pickImpl } from '../utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonBaseProps extends PropsWithChildren {
  style?: StyleProp<TextStyle>
}

export interface ButtonProps
  extends PropsWithChildren,
  VariantProps<typeof buttonVariants> {
  className?: string
}

const textStyles = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textDecorationLine',
  'textDecorationStyle',
  'textDecorationColor',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',
  'textTransform',
  'userSelect',
] satisfies (keyof TextStyle)[]

const BaseButton = forwardRef<TouchableOpacity, ButtonBaseProps>(({ style, children }, ref) => {
  const flattenStyle = useMemo(() => StyleSheet.flatten(style) as TextStyle | undefined, [style])
  const textStyle = useMemo(() => flattenStyle && pickImpl(flattenStyle, textStyles), [flattenStyle])
  const viewStyle = useMemo(() => flattenStyle && omitImpl(flattenStyle, textStyles) as ViewStyle, [flattenStyle])

  return (
    <TouchableOpacity ref={ref} style={viewStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
})
BaseButton.displayName = 'BaseButton'

const InteropedButton = cssInterop(BaseButton, {
  className: 'style',
})

const Button = forwardRef<TouchableOpacity, ButtonProps>(({ children, className, variant, size }, ref) => {
  return (
    <InteropedButton
      ref={ref}
      className={buttonVariants({ variant, size, className })}
    >
      {children}
    </InteropedButton>
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
