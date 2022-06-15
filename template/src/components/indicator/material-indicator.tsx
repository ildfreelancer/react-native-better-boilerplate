import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { ScaledSheet } from '@lib/react-native-size-matters'

export const MaterialIndicator = () => {
  const rotation = useSharedValue(0)

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    )
    return () => cancelAnimation(rotation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    }
  }, [rotation.value])

  return <Animated.View style={[styles.spinner, animatedStyles]} />
}

const styles = ScaledSheet.create({
  spinner: {
    backgroundColor: 'transparent',
    height: '64@s',
    width: '64@s',
    borderRadius: '32@s',
    borderWidth: '6@s',
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderRightColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    borderLeftColor: 'white',
  },
})
