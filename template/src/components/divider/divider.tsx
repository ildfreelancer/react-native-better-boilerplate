import { useTheme } from '@hooks/useTheme'
import {
  composeRestyleFunctions,
  layout,
  spacing,
  spacingShorthand,
  useRestyle,
} from '@shopify/restyle'
import type { ColorProps, LayoutProps, SpacingProps, SpacingShorthandProps } from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { Divider as RNEDivider, DividerProps as RNEDividerProps } from '@rneui/themed'

const restyleFunc: any = composeRestyleFunctions<Theme, any>([layout, spacing, spacingShorthand])
type DividerProps = Omit<RNEDividerProps, 'color'> & {
  color?: ColorProps<Theme> | string
} & LayoutProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme>
export const Divider = ({ color = 'line', style, ...rest }: DividerProps) => {
  const theme = useTheme()
  const { style: restyled } = useRestyle(restyleFunc, rest) as any

  const outputColor = theme.colors[color as keyof Theme['colors']] ?? color
  return <RNEDivider color={outputColor} style={[...restyled, style]} {...rest} />
}
