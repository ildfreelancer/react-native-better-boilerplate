import { omitNil } from '@utils/lodash'
import { icons } from './icons'
import { Icon as RNEIcon } from '@rneui/themed'
import { useTheme } from '@hooks/useTheme'
import { Theme } from '@styles/theme'
import { Box } from '@components/atom'
import type { BoxProps } from '@components/atom'
import { IconProps as RNEIconProps } from '@rneui/themed'
import { IconName } from './icons'

export type IconProps = Omit<RNEIconProps, 'size'> &
  BoxProps & {
    name: IconName | string
    stroke?: string
    fill?: string
    width?: number
    height?: number
    opacity?: number
    size?: number
  }

export function Icon(props: IconProps) {
  const theme = useTheme()
  const { name, size, height, width, color: colorProp, type, ...rest } = props
  const color = theme.colors[colorProp as keyof Theme['colors']] ?? colorProp

  const IconSVG = icons[name] ?? RNEIcon
  const objectProps = omitNil({
    name,
    size,
    height: height || size,
    width: width || size,
    color,
    type,
  })
  return (
    <Box {...rest}>
      <IconSVG {...objectProps} />
    </Box>
  )
}
