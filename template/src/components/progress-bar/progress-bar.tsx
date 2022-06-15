import { useOnLayout } from '@hooks/useOnLayout'
import { StyleProp, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { useAnimatedProgress } from '@hooks/useAnimatedProgress'
import { s, ScaledSheet } from '@lib/react-native-size-matters'
import { Box, BoxProps } from '@components/atom'
import {
  border,
  BorderProps,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  spacingShorthand,
  SpacingShorthandProps,
  useRestyle,
  composeRestyleFunctions,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { palette } from '@styles/palette'

const restyleFuncs = composeRestyleFunctions([layout, spacing, spacingShorthand, border]) as any
type ProgressBarProps = BoxProps &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> & {
    percent: number
    style?: StyleProp<ViewStyle>
    progressStyle?: StyleProp<ViewStyle>
    colors?: string[]
  }
export const ProgressBar = ({ progressStyle, percent, ...rest }: ProgressBarProps) => {
  const [{ width }, onLayout] = useOnLayout()
  const animatedWidth = useAnimatedProgress({ width, percent })
  const { style: container }: any = useRestyle(restyleFuncs, rest)

  return (
    <Box
      onLayout={onLayout}
      width="100%"
      bg="bg4"
      height={s(4)}
      borderRadius="s-2.5"
      style={container}>
      <Animated.View style={[styles.progress, { width: animatedWidth }, progressStyle]} />
    </Box>
  )
}

const styles = ScaledSheet.create({
  progress: {
    borderRadius: '10@s',
    height: '4@s',
    width: '100%',
    backgroundColor: palette.blue[500],
  },
})
