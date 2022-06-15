/* eslint-disable react-native/no-inline-styles */
import { Text, HStack, TouchableOpacity } from '@components/index'
import { s, ScaledSheet } from '@lib/react-native-size-matters'
import { useCallback, useState, useEffect } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'
import type { BoxProps } from '@components/atom'

type SwitcherProps = BoxProps & {
  labelTx1: string
  labelTx2: string
  inactiveTextColor?: string
  activeTextColor?: string
  activeIndex?: number
  leftProps?: Record<string, string | number>
  rightProps?: Record<string, string | number>
  onLeftPress?: () => void
  onRightPress?: () => void
  onLayout?: any
  slideStyle?: StyleProp<ViewStyle>
  height?: number
}
export const Switcher = ({
  height = 48,
  activeIndex = 0,
  labelTx1,
  leftProps,
  rightProps,
  labelTx2,
  onLeftPress,
  onRightPress,
  inactiveTextColor = 'white',
  activeTextColor = 'primary',
  slideStyle = {},
  ...rest
}: SwitcherProps) => {
  const [translateValue] = useState(new Animated.Value(0))
  const [tabWidth, setTabWidth] = useState(0)
  const [activeIdx, setActiveIdx] = useState(activeIndex)

  const animateSlider = useCallback(
    (idx: number) => {
      Animated.spring(translateValue, {
        toValue: idx * tabWidth,
        velocity: 20,
        useNativeDriver: true,
      }).start()
    },
    [tabWidth, translateValue],
  )

  useEffect(() => {
    animateSlider(activeIdx)
  }, [activeIdx, animateSlider])

  const onItemLayout = useCallback(event => {
    const { width } = event.nativeEvent.layout
    setTabWidth(width / 2)
  }, [])

  const _onLeftPress = useCallback(() => {
    setActiveIdx(0)
    onLeftPress?.()
  }, [onLeftPress])

  const _onRightPress = useCallback(() => {
    setActiveIdx(1)
    onRightPress?.()
  }, [onRightPress])

  return (
    <HStack
      borderRadius="s-3"
      bg="whiteA03"
      height={height}
      alignItems="center"
      px="s-1"
      onLayout={onItemLayout}
      style={styles.container}
      {...rest}>
      <Animated.View
        style={[
          {
            transform: [{ translateX: translateValue }],
          },
          {
            position: 'absolute',
            height: height - 8,
            width: tabWidth,
            borderRadius: s(12),
            backgroundColor: 'white',
            left: activeIdx === 0 ? 4 : -4,
            ...(slideStyle as any),
          },
        ]}
      />

      <TouchableOpacity flex={1} py="vs-1" onPress={_onLeftPress}>
        <Text
          tx={labelTx1}
          color={(activeIdx === 0 ? activeTextColor : inactiveTextColor) as any}
          variant="h5"
          textAlign="center"
          {...leftProps}
        />
      </TouchableOpacity>
      <TouchableOpacity flex={1} py="vs-1" onPress={_onRightPress}>
        <Text
          tx={labelTx2}
          variant="h5"
          color={(activeIdx === 1 ? activeTextColor : inactiveTextColor) as any}
          textAlign="center"
          {...rightProps}
        />
      </TouchableOpacity>
    </HStack>
  )
}

const styles = ScaledSheet.create({
  container: {
    shadowRadius: 4,
    shadowOpacity: 0.25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
  },
})
