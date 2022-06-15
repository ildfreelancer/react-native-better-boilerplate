/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
import { Input, InputProps } from '@rneui/themed'
import { StyleSheet, ViewStyle } from 'react-native'
import {
  useRestyle,
  spacing,
  border as restyleBorder,
  backgroundColor,
  createVariant,
  typography as restyleTypography,
  color,
  layout,
  spacingShorthand,
  backgroundColorShorthand,
} from '@shopify/restyle'
import type {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  VariantProps,
  LayoutProps,
  TypographyProps,
  SpacingShorthandProps,
  BackgroundColorShorthandProps,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { TextProps } from '@components/text'
import { FC, ReactNode, Ref, useCallback, useMemo, useState } from 'react'
import { useTheme } from '@hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { composeRestyleFunctions } from '@shopify/restyle'
import omit from 'lodash-es/omit'
import { fontFamily as restyledFontFamily, fontSize as restyledFontSize } from '@styles/restyle'
import { IconButton } from '@components/icon-button'
import type { IconButtonProps } from '@components/icon-button'

const viewRestyleFunctions = composeRestyleFunctions<Theme, any>([
  layout,
  spacing,
  spacingShorthand,
  restyleBorder,
  backgroundColor,
  backgroundColorShorthand,
]) as any

const containerRestyleFunctions = composeRestyleFunctions<Theme, any>([
  layout,
  spacing,
  spacingShorthand,
  restyleBorder,
  backgroundColor,
  backgroundColorShorthand,
  createVariant({ themeKey: 'inputVariants' }),
]) as any

const textRestyleFunctions = composeRestyleFunctions<Theme, any>([
  layout,
  spacing,
  spacingShorthand,
  restyleTypography,
  color,
  createVariant({ themeKey: 'textVariants' }),
]) as any

const inputRestyleFunctions = composeRestyleFunctions<Theme, any>([
  layout,
  spacing,
  spacingShorthand,
  restyleTypography,
  color,
  restyledFontFamily,
  restyledFontSize,
  createVariant({ themeKey: 'textVariants' }),
]) as any

export type TextFieldProps = Omit<InputProps, 'shake'> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress?: () => void
  } & VariantProps<Theme, 'inputVariants'> & {
    labelTx?: string
    label?: string
    textTxOptions?: Pick<TextProps, 'txOptions'>
    variant?: keyof Theme['inputVariants']
    inputVariant?: keyof Theme['textVariants']
    labelVariant?: keyof Theme['textVariants']
    errorVariant?: keyof Theme['textVariants']
    textVariant?: keyof Theme['textVariants']
    _inputContainer?: LayoutProps<Theme> &
      SpacingProps<Theme> &
      SpacingShorthandProps<Theme> &
      BorderProps<Theme> &
      BackgroundColorProps<Theme> &
      BackgroundColorShorthandProps<Theme>
    _input?: TextProps & TypographyProps<Theme> & LayoutProps<Theme>
    _label?: TextProps & TypographyProps<Theme> & LayoutProps<Theme>
    _error?: TextProps & TypographyProps<Theme> & LayoutProps<Theme>
    _left?: LayoutProps<Theme> & SpacingProps<Theme> & SpacingShorthandProps<Theme>
    _right?: LayoutProps<Theme> & SpacingProps<Theme> & SpacingShorthandProps<Theme>
    children?: ReactNode
    placeholderTx?: string
    mask?: string
    border?: boolean
    inputRef?: Ref<any>
  }

export const TextField: FC<TextFieldProps> = props => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [isFocus, setFocus] = useState(false)
  const {
    placeholderTx,
    placeholder,
    variant = 'underline',
    inputVariant = 'input',
    labelVariant = 'inputLabel',
    errorVariant = 'inputError',
    _inputContainer,
    _input,
    _label,
    _error,
    _left,
    _right,
    secureTextEntry,
    errorStyle,
    keyboardAppearance = 'light',
    inputRef,
    labelTx,
    label,
    onFocus,
    onBlur,
    rightIcon,
    leftIcon,
    ...rest
  } = props

  const { style: containerRestyle } = useRestyle(viewRestyleFunctions, rest)
  const { style: inputContainerRestyle } = useRestyle(containerRestyleFunctions, {
    variant,
    ..._inputContainer,
  })
  const { style: inputRestyle } = useRestyle(inputRestyleFunctions, {
    variant: inputVariant,
    ..._input,
  })
  const { style: labelRestyle } = useRestyle(textRestyleFunctions, {
    variant: labelVariant,
    ..._label,
  })
  const { style: errorRestyle } = useRestyle(textRestyleFunctions, {
    variant: errorVariant,
    ..._error,
  })
  const { style: leftRestyle } = useRestyle(viewRestyleFunctions, {
    ..._left,
  })
  const { style: rightRestyle } = useRestyle(viewRestyleFunctions, {
    ..._right,
  })
  const actualPlaceholder = placeholderTx ? t(placeholderTx as any) : placeholder

  const _onFocus = useCallback(
    e => {
      setFocus(true)
      onFocus?.(e)
    },
    [onFocus],
  )

  const _onBlur = useCallback(
    e => {
      setFocus(false)
      onBlur?.(e)
    },
    [onBlur],
  )

  const inputContainerStyle = useMemo(() => {
    const style: any = {}
    if (variant === 'underline' && isFocus) {
      style.borderBottomColor = theme.colors.primary
    }
    return [inputContainerRestyle, style]
  }, [variant, isFocus, inputContainerRestyle, theme.colors.primary])

  return (
    <Input
      underlineColorAndroid="transparent"
      selectionColor={theme.colors.primary}
      keyboardAppearance={keyboardAppearance}
      containerStyle={[styles.containerStyle, containerRestyle]}
      inputContainerStyle={[styles.inputContainer, inputContainerStyle, { marginLeft: 0 }]}
      inputStyle={inputRestyle}
      placeholder={actualPlaceholder}
      placeholderTextColor={theme.colors.placeholder}
      secureTextEntry={secureTextEntry}
      leftIconContainerStyle={[styles.leftIconContainer, leftRestyle]}
      rightIconContainerStyle={[styles.rightIconContainer, rightRestyle]}
      errorStyle={[
        styles.error,
        { display: props.errorMessage ? 'flex' : 'none' },
        errorStyle,
        errorRestyle,
      ]}
      onFocus={_onFocus}
      onBlur={_onBlur}
      ref={inputRef}
      label={labelTx ? t(labelTx as any) : label}
      labelStyle={labelRestyle}
      rightIcon={rightIcon?.name ? <IconButton {...(rightIcon as IconButtonProps)} /> : rightIcon}
      leftIcon={leftIcon?.name ? <IconButton {...(leftIcon as IconButtonProps)} /> : leftIcon}
      {...omit(rest, ['height', 'width', 'minHeight', 'minWidth', 'maxHeight', 'maxWidth'])}
    />
  )
}

type Style = {
  containerStyle: ViewStyle
  inputContainer: ViewStyle
  error: ViewStyle
  leftIconContainer: ViewStyle
  rightIconContainer: ViewStyle
}
const styles = StyleSheet.create<Style>({
  containerStyle: {
    paddingHorizontal: 0,
  },
  error: {
    marginLeft: 0,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  leftIconContainer: {
    marginVertical: 0,
    marginRight: 10,
  },
  rightIconContainer: {
    marginVertical: 0,
  },
})
