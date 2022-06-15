import { ReactNode } from 'react'
import {
  Platform,
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native'

/*
  The idea of this component is
  in case you want to change activeOpacity for the touchable component across the app
  you only need to change one place and apply anywhere
*/
type TouchableOpacityProps = RNTouchableOpacityProps & {
  children?: ReactNode
}
export const TouchableOpacity = ({
  children,
  activeOpacity = 0.8,
  ...props
}: TouchableOpacityProps) => (
  <RNTouchableOpacity activeOpacity={Platform.OS === 'ios' ? activeOpacity : 1} {...props}>
    {children}
  </RNTouchableOpacity>
)
