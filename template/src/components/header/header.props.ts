import { StyleProp, ViewStyle } from 'react-native'
import { IconProps } from '../icon'
import { HeaderProps as RNEHeaderProps } from '@rneui/themed'
import { TextProps } from '../text'
import { ButtonProps } from '../button'
import {
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  LayoutProps,
  SpacingProps,
  SpacingShorthandProps,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'

export interface HeaderProps extends RNEHeaderProps {
  /**
   * Main header, e.g. POWERED BY BOWSER
   */
  header?: string
  headerTx?: string
  headerTxOptions?: Record<string, string>
  headerTextProps?: TextProps
  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconProps
  leftButtonProps?: ButtonProps

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconProps

  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * i18 Right title.
   */
  rightTx?: string
  rightTextProps?: TextProps
  rightButtonProps?: ButtonProps
  /**
   * Container style overrides.
   */
  style?: LayoutProps<Theme> &
    SpacingProps<Theme> &
    SpacingShorthandProps<Theme> &
    BackgroundColorProps<Theme> &
    BackgroundColorShorthandProps<Theme> &
    StyleProp<ViewStyle>
}
