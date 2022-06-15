import { TextField, TextFieldProps } from '@components/index'
import { NativeSyntheticEvent, StyleProp, TextInputFocusEventData, ViewStyle } from 'react-native'
import { useCallback, useState } from 'react'
import { s } from '@lib/react-native-size-matters'

export type PasswordFieldProps = TextFieldProps & {
  style?: StyleProp<ViewStyle>
}
export const PasswordField = ({ onBlur, onFocus, value, ...props }: PasswordFieldProps) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true)
  const [isPasswordFocus, setPasswordFocus] = useState(false)

  const _toggleSecureTextEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry)
  }, [secureTextEntry])

  const _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setPasswordFocus(false)
      onBlur?.(e)
    },
    [onBlur],
  )

  const _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setPasswordFocus(true)
      onFocus?.(e)
    },
    [onFocus],
  )

  return (
    <TextField
      placeholderTx="your_password"
      onFocus={_onFocus}
      onBlur={_onBlur}
      secureTextEntry={secureTextEntry}
      leftIcon={{ name: 'lock', color: isPasswordFocus ? 'active' : 'inactive', size: s(16) }}
      rightIcon={{
        name: secureTextEntry ? 'eye-off' : 'eye-on',
        size: s(16),
        onPress: _toggleSecureTextEntry,
        testID: 'btn_toggle_visible_password',
      }}
      _input={{
        fontSize: secureTextEntry && value && value?.length > 0 ? 17 : 16,
      }}
      _right={{ pr: 'none', width: s(24) }}
      returnKeyType="done"
      autoCapitalize="none"
      value={value}
      {...props}
    />
  )
}
