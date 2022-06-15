import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import {
  color as restyleColor,
  ColorProps,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { BoxProps, Box } from '@components/atom'
import { pick } from '@utils/lodash'

const restyleFunctions = composeRestyleFunctions([restyleColor])
type SpinnerProps = Omit<ActivityIndicatorProps, 'color'> &
  ColorProps<Theme> &
  BoxProps & {
    loading?: boolean
  }
export const Spinner = ({ loading = true, color = 'primary', ...rest }: SpinnerProps) => {
  const { style }: any = useRestyle(restyleFunctions as any, { color })

  return loading ? (
    <Box {...rest}>
      <ActivityIndicator
        color={(style && style[0]?.color) || 'black'}
        {...pick(rest, ['size', 'animating', 'style', 'color', 'hidesWhenStopped', 'onLayout'])}
      />
    </Box>
  ) : null
}
