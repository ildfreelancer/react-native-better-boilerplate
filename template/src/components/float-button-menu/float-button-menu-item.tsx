import { Text } from '@components/text'
import { DeviceEventEmitter, StyleSheet } from 'react-native'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useCallback } from 'react'
import { SUBBTN_BORDER_RADIUS, SUBBTN_HEIGHT, SUBBTN_TAP_EVENT, SUBBTN_WIDTH } from './constants'
import { Box, BoxProps } from '@components/atom'

const AnimatedBox = Animated.createAnimatedComponent(Box)

type FloatButtonMenuItemProps = BoxProps & {
  label?: string
  labelTx?: string
  onPress?: () => void
}
export const FloatButtonMenuItem = ({
  label,
  onPress,
  labelTx,
  ...rest
}: FloatButtonMenuItemProps) => {
  /**
   * The shared value of the button opacity. We change
   * the opacity when the button is being held down.
   */
  const buttonOpacity = useSharedValue(1)

  /**
   * The tap gesture handler for the button.
   *
   * We change the opacity to represent the button being
   * pressed. If the button does get pressed, we emit the SubButton tap event to
   * trigger the FAB children container to close; if the press is interrupted,
   * we change the opacity back to 1.0 and break.
   */
  const _onTapHandlerStateChange = useCallback(
    ({ nativeEvent }) => {
      switch (nativeEvent.state) {
        case State.BEGAN: {
          buttonOpacity.value = 0.5
          break
        }
        case State.END: {
          DeviceEventEmitter.emit(SUBBTN_TAP_EVENT)
          buttonOpacity.value = 1.0
          onPress?.()
          break
        }
        case State.CANCELLED: {
          buttonOpacity.value = 1.0
          break
        }
        case State.FAILED: {
          buttonOpacity.value = 1.0
          break
        }
        case State.UNDETERMINED: {
          buttonOpacity.value = 1.0
          break
        }
      }
    },
    [buttonOpacity, onPress],
  )

  /**
   * The animated styles for the opacity of the button
   * that is used in the style prop of the button
   */
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: buttonOpacity.value,
    }
  })

  return (
    <TapGestureHandler onHandlerStateChange={_onTapHandlerStateChange}>
      <AnimatedBox style={[styles.subButton, animatedStyles]} {...rest}>
        <Text color="white" variant="body15" text={label} tx={labelTx} />
      </AnimatedBox>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  subButton: {
    width: SUBBTN_WIDTH,
    height: SUBBTN_HEIGHT,
    borderRadius: SUBBTN_BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
})
