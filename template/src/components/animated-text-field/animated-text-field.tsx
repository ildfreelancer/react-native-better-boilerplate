/* eslint-disable react-native/no-inline-styles */
import { Input, InputProps } from '@rneui/themed'
import { Animated, ViewStyle, TextStyle, TouchableWithoutFeedback } from 'react-native'
import {
  useRestyle,
  spacing,
  border as restyleBorder,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  createVariant,
  VariantProps,
  typography as restyleTypography,
  color,
  layout,
  LayoutProps,
  TypographyProps,
  SpacingShorthandProps,
  spacingShorthand,
  backgroundColorShorthand,
  composeRestyleFunctions,
  BackgroundColorShorthandProps,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { TextProps, Text } from '@components/text'
import { s, ScaledSheet } from '@lib/react-native-size-matters'
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTheme } from '@hooks/useTheme'
import { typography } from '@styles/typography'
import { Box, BoxProps } from '@components/atom'

export type AnimatedTextFieldProps = Omit<InputProps, 'shake'> &
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
    textVariant?: keyof Theme['textVariants']
    labelVariant?: keyof Theme['textVariants']
    _text?: TextProps & TypographyProps<Theme> & LayoutProps<Theme>
    _input?: TextProps & TypographyProps<Theme> & LayoutProps<Theme>
    _inputContainer?: LayoutProps<Theme> &
      SpacingProps<Theme> &
      SpacingShorthandProps<Theme> &
      BorderProps<Theme> &
      BackgroundColorProps<Theme> &
      BackgroundColorShorthandProps<Theme>
    _container?: BoxProps
    _label?: BoxProps
    children?: ReactNode
    placeholderTx?: string
    mask?: string
    border?: boolean
    required?: boolean
    inputRef?: any
    showLabel?: boolean
  }

const inputRestyleFuncs = composeRestyleFunctions([
  layout,
  spacing,
  spacingShorthand,
  restyleBorder,
  backgroundColor,
  backgroundColorShorthand,
  createVariant({ themeKey: 'inputVariants' }) as any,
]) as any
const textRestyleFuncs = composeRestyleFunctions([
  layout,
  spacing,
  spacingShorthand,
  restyleTypography,
  color,
  createVariant({ themeKey: 'textVariants' }) as any,
]) as any
export const AnimatedTextField: FC<AnimatedTextFieldProps> = props => {
  const theme = useTheme()
  const [isFocus, setFocus] = useState(false)
  const {
    textVariant = 'input',
    labelVariant = 'regular',
    inputStyle,
    containerStyle,
    variant = 'underline',
    _text,
    _inputContainer,
    _container,
    _label,
    secureTextEntry,
    errorStyle,
    keyboardAppearance = 'light',
    border = true,
    inputRef,
    labelTx,
    label,
    required,
    showLabel = true,
    onFocus,
    onBlur,
    ...rest
  } = props
  const { style: inputRestyle } = useRestyle(inputRestyleFuncs, {
    variant,
    ..._inputContainer,
  })
  const { style: textRestyle } = useRestyle(textRestyleFuncs, {
    variant: textVariant,
    ..._text,
  })
  const { style: labelStyle } = useRestyle(textRestyleFuncs, {
    variant: labelVariant,
    ..._label,
  })
  const topAnim = useRef<Animated.Value>(new Animated.Value(props.value ? -s(10) : s(12)))
  const [inputValue, setInputValue] = useState<string | undefined>(props.value)
  const ref = useRef(inputRef?.current)

  useImperativeHandle(
    inputRef,
    () => {
      return {
        focus() {
          ref?.current?.focus?.()
        },
      }
    },
    [],
  )
  useEffect(() => {
    if (!inputValue?.length && props.value?.length) {
      Animated.spring(topAnim.current, { toValue: 1, useNativeDriver: false }).start()
      setFocus(false)
    }
    setInputValue(props.value)
  }, [inputValue?.length, props.value])

  const _showLabel = useCallback(() => {
    Animated.spring(topAnim.current, { toValue: -s(10), useNativeDriver: false }).start()
    setFocus(true)
  }, [])

  const _onFocus = useCallback(
    e => {
      _showLabel()

      onFocus?.(e)
    },
    [_showLabel, onFocus],
  )

  const _onBlur = useCallback(
    e => {
      setFocus(false)

      if (!inputValue?.length) {
        Animated.spring(topAnim.current, { toValue: s(12), useNativeDriver: false }).start()
        setFocus(false)
      }

      onBlur?.(e)
    },
    [inputValue?.length, onBlur],
  )

  const inputContainerStyle = useMemo(() => {
    const isError = !!props.errorMessage

    const style: ViewStyle = {}
    if (variant === 'default' && isFocus) {
      style.borderColor = theme.colors.primary
    }

    if (variant === 'underline' && isFocus) {
      style.borderBottomColor = theme.colors.primary
    }

    if (!border) {
      style.borderColor = 'transparent'
    }

    if (isError && border) {
      style.borderColor = theme.colors.error
    }

    return [inputRestyle, style]
  }, [
    props.errorMessage,
    variant,
    isFocus,
    border,
    inputRestyle,
    theme.colors.primary,
    theme.colors.error,
  ])

  const _onChangeText = useCallback(
    value => {
      setInputValue(value)

      props.onChangeText?.(value)

      _showLabel()
    },
    [props, _showLabel],
  )

  const _onLabelPress = useCallback(() => {
    _showLabel()
    ref?.current?.focus?.()
  }, [_showLabel, ref])

  return (
    <Box {..._container}>
      {showLabel && (
        <TouchableWithoutFeedback onPress={_onLabelPress}>
          <Animated.View style={[styles.label, labelStyle, { top: topAnim.current }]}>
            <Text
              numberOfLines={1}
              text={label}
              tx={labelTx}
              color={isFocus ? 'inactive' : 'placeholder'}
              fontFamily={inputValue?.length ? 'primary-semi' : 'primary-regular'}
              fontSize={inputValue?.length || isFocus ? 'smallS' : 'regular'}
            />
            {required && <Text text="*" color="highlight" variant="label" />}
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
      <Input
        underlineColorAndroid="transparent"
        selectionColor={theme.colors.primary}
        keyboardAppearance={keyboardAppearance}
        inputContainerStyle={[styles.input, inputContainerStyle, inputStyle]}
        leftIconContainerStyle={styles.leftIconContainer}
        rightIconContainerStyle={styles.rightIconContainer}
        containerStyle={[styles.containerStyle, containerStyle]}
        inputStyle={[textRestyle, { textAlignVertical: 'center' }]}
        placeholderTextColor={theme.colors.placeholder}
        secureTextEntry={secureTextEntry}
        errorStyle={[
          styles.error,
          { color: theme.colors.error, display: props.errorMessage ? 'flex' : 'none' },
          errorStyle,
        ]}
        ref={ref}
        {...(rest as any)}
        onFocus={_onFocus}
        onBlur={_onBlur}
        onChangeText={_onChangeText}
      />
    </Box>
  )
}

type Style = {
  containerStyle: ViewStyle
  leftIconContainer: ViewStyle
  input: ViewStyle
  rightIconContainer: ViewStyle
  error: TextStyle
  label: ViewStyle
}
const styles = ScaledSheet.create<Style>({
  containerStyle: {
    paddingHorizontal: 0,
  },
  error: {
    fontFamily: typography.fontFamily.primary.regular,
    fontSize: typography.fontSize.tiny,
    marginLeft: 0,
  },
  input: {
    paddingHorizontal: 0,
  },
  leftIconContainer: {
    marginVertical: 0,
  },
  rightIconContainer: {
    marginVertical: 0,
  },
  label: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
