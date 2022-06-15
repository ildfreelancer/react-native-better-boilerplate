import { withBadge } from '@rneui/themed'
import { Icon, IconProps } from '@components/icon'
import { TextProps } from '@components/text'
import { BoxProps } from '@components/atom'
import {
  color as restyleColor,
  composeRestyleFunctions,
  typography,
  createVariant,
  spacing,
  useRestyle,
  layout,
  spacingShorthand,
  border,
  backgroundColor,
  backgroundColorShorthand,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { fontFamily, fontSize } from '@styles/restyle'
import { TouchableOpacity } from '@components/native'

const composedTextRestyleFunction = composeRestyleFunctions<Theme, any>([
  spacing,
  restyleColor,
  fontFamily,
  fontSize,
  typography,
  createVariant({ themeKey: 'textVariants' }),
])
const composedContainerRestyleFunction = composeRestyleFunctions<Theme, any>([
  layout,
  spacing,
  spacingShorthand,
  border,
  backgroundColor,
  backgroundColorShorthand,
])

export type BadgedIconProps = IconProps & {
  value: number
  badgePosition?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  _text?: TextProps
  _badge?: BoxProps
  onPress?: () => void
  color?: string
}
export const BadgedIcon = ({
  value,
  name,
  size,
  badgePosition = {
    top: -2,
    right: -2,
  },
  _text,
  _badge,
  color,
  onPress,
}: BadgedIconProps) => {
  const { style: textStyle } = useRestyle(composedTextRestyleFunction as any, {
    variant: 'semiBoldXS',
    color: 'primary',
    fontSize: 7,
    ..._text,
  }) as any
  const { style: badgeStyle } = useRestyle(composedContainerRestyleFunction as any, {
    backgroundColor: 'white',
    minWidth: 12,
    height: 12,
    borderRadius: 's-1.5',
    ..._badge,
  }) as any

  const BadgedWithIcon = withBadge(value, {
    ...badgePosition,
    textStyle,
    badgeStyle,
  })(Icon) as typeof Icon

  return (
    <TouchableOpacity onPress={onPress}>
      <BadgedWithIcon name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}
