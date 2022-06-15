/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Animated, { EasingNode } from 'react-native-reanimated'

const { Value, timing } = Animated

type AnimatedProgressProps = {
  width: number
  percent: number
  duration?: number
}
export const useAnimatedProgress = ({
  width,
  percent,
  duration = 700,
}: AnimatedProgressProps): Animated.Node<number> => {
  const [translateX] = useState(new Value(0))

  useEffect(() => {
    timing(translateX, {
      toValue: width * percent || 0,
      duration: duration,
      easing: EasingNode.inOut(EasingNode.ease),
    }).start()
  }, [percent, width, duration])

  return translateX
}
