import { useCallback } from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

export const DismissKeyboard = ({ children }) => {
  const _onKeyboardDismiss = useCallback(() => {
    Keyboard.dismiss()
  }, [])
  return (
    <TouchableWithoutFeedback onPress={_onKeyboardDismiss}>{children}</TouchableWithoutFeedback>
  )
}
