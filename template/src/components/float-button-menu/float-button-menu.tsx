import React, { useEffect, useState } from 'react'
import { DeviceEventEmitter, StyleSheet } from 'react-native'

import {
  FAB_BACKGROUND_COLOR,
  FAB_BORDER_RADIUS,
  FAB_HEIGHT,
  FAB_WIDTH,
  FAB_ROTATION_CLOSE,
  FAB_PLUS_TRANSLATE_Y_CLOSE,
  FAB_CHILDREN_POSITION_Y_CLOSE,
  FAB_CHILDREN_OPACITY_CLOSE,
  FAB_CHILDREN_OPACITY_OPEN,
  FAB_ROTATION_OPEN,
  FAB_PLUS_TRANSLATE_Y_OPEN,
  FAB_CHILDREN_POSITION_Y_OPEN,
  SUBBTN_TAP_EVENT,
} from './constants'

import { State, TapGestureHandler } from 'react-native-gesture-handler'
import { Box } from '@components/atom'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { BlurView } from '@react-native-community/blur'

export const FloatButtonMenu = props => {
  /**
   * Holds the state of the button being either closed / open
   */
  const [opened, setOpened] = useState(false)

  /**
   * Destructure the children prop for the SubButton(s)
   */
  const { children } = props

  /**
   * We also rotate the button to change the + to a x
   * when the children view is visible. The plus text is
   * also offset to accommodate for the anchor point of the
   * rotation not being in the center of the +
   */
  const fabRotation = useSharedValue(FAB_ROTATION_CLOSE)
  const fabPlusTranslateY = useSharedValue(FAB_PLUS_TRANSLATE_Y_CLOSE)

  /**
   * The opacity and Y position of the children container for the
   * SubButton(s). We use this to show a sliding fade in/out animation when
   * the user taps the FAB button
   */
  const childrenYPosition = useSharedValue(FAB_CHILDREN_POSITION_Y_CLOSE)
  const childrenOpacity = useSharedValue(FAB_CHILDREN_OPACITY_CLOSE)

  /**
   * The animated styles hook that is used in the
   * style prop for the children view. The opacity of the children
   * and the y-position update depending on the shared values used.
   */
  const animatedChildrenStyles = useAnimatedStyle(() => {
    return {
      opacity: childrenOpacity.value,
      transform: [{ translateY: childrenYPosition.value }],
    }
  })

  /**
   * The animated styles hook that is used in the
   * style prop for the FAB. It updates the rotation value
   * when the fabRotation shared value is changed.
   */
  const animatedFABStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${fabRotation.value}deg` }],
    }
  })

  /**
   * The animated styles hook that is used in the
   * style prop for the plus text in the FAB. It update
   * the y-position for the text when the fabPlusTranslateY shared value
   * is changed.
   */
  const animatedPlusText = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: fabPlusTranslateY.value }],
    }
  })

  /**
   * Method that runs when we want to show the SubButton(s)
   *
   * First we set the state of "opened" to true to show the
   * SubButton(s). When opened, the initial opacity and translate values
   * are set to their starting values, so we don't see the buttons yet.
   *
   * Next, we update the opacity and translation values using the withTiming
   * hook to show the SubButton(s).
   *
   * Finally, we rotate the FAB and move the plus text slightly to offset it
   * to consider the anchor point we are rotating from. We are using the useSpring
   * hook for a nice looking spring animation that is easy to use!
   */
  function _open() {
    setOpened(true)
    childrenOpacity.value = withTiming(FAB_CHILDREN_OPACITY_OPEN, {
      duration: 300,
    })
    childrenYPosition.value = withTiming(FAB_CHILDREN_POSITION_Y_OPEN, {
      duration: 200,
    })
    fabRotation.value = withSpring(FAB_ROTATION_OPEN)
    fabPlusTranslateY.value = withSpring(FAB_PLUS_TRANSLATE_Y_OPEN)
  }

  /**
   * Method called when we want to hide the SubButton(s)
   *
   * This is essentially the same function as _open(), but in reverse.
   * However, we need to delay setting the opened state to false to let
   * the closing animation play out because as soon as we set that state
   * to false, the component will unmount.
   */
  function _close() {
    childrenOpacity.value = withTiming(FAB_CHILDREN_OPACITY_CLOSE, {
      duration: 300,
    })
    childrenYPosition.value = withTiming(FAB_CHILDREN_POSITION_Y_CLOSE, {
      duration: 300,
    })
    fabRotation.value = withSpring(FAB_ROTATION_CLOSE)
    fabPlusTranslateY.value = withSpring(FAB_PLUS_TRANSLATE_Y_CLOSE)
    setTimeout(() => {
      setOpened(false)
    }, 300)
  }

  /**
   * Handles the release of the tap on the FAB.
   * We run the close/open function depending on the
   * state of the button.
   */
  const _onTapHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      opened ? _close() : _open()
    }
  }

  /**
   * A useEffect (componentDidMount) that adds an
   * event listener to the FAB so when we tap any SubButton we close
   * the SubButton container.
   *
   * The return statement (componentWillUnmount) removes the listener.
   */
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(SUBBTN_TAP_EVENT, () => {
      _close()
    })
    return () => listener.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {opened && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <Box
        position="absolute"
        zIndex={5}
        bottom={34}
        right={24}
        borderRadius="full"
        alignItems="flex-end">
        {opened && (
          <Animated.View style={[styles.childrenStyles, animatedChildrenStyles]}>
            {children}
          </Animated.View>
        )}
        <TapGestureHandler onHandlerStateChange={_onTapHandlerStateChange}>
          <Animated.View style={[styles.fabButtonStyles, animatedFABStyles]}>
            <Animated.Text style={[styles.plus, animatedPlusText]}>+</Animated.Text>
          </Animated.View>
        </TapGestureHandler>
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 4,
  },
  fabButtonStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FAB_BACKGROUND_COLOR,
    width: FAB_WIDTH,
    height: FAB_HEIGHT,
    borderRadius: FAB_BORDER_RADIUS,
  },
  childrenStyles: {
    alignItems: 'center',
    marginBottom: 16,
  },
  plus: {
    fontSize: 30,
    color: '#EFFBFA',
  },
})
