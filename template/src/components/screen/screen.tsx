/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@hooks/useTheme'
import { KeyboardAvoidingView, StatusBar, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Header } from '../header'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { ScreenProps } from './screen.props'

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.bg ? { backgroundColor: theme.colors[props.bg] } : {}
  const insetStyle = props.unsafe
    ? {}
    : { paddingBottom: insets.bottom, paddingTop: props.header ? 0 : insets.top }
  const ScreenHeader = props.header ? Header : View

  const statusBarPropsDefault = {
    barStyle: props.barStyle || 'dark-content',
    backgroundColor: 'transparent',
    translucent: true,
    ...props.statusBarProps,
  }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle, props.containerStyle]}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
      {...props.keyboardAvoidingViewProps}
    >
      <StatusBar {...statusBarPropsDefault} />
      <ScreenHeader {...props.header} />

      <View style={[preset.inner, insetStyle, style]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const theme = useTheme()
  const preset = presets.scroll
  const { safeAreaViewProps = { edges: ['left', 'right'] } } = props
  const backgroundStyle = props.bg ? { backgroundColor: theme.colors[props.bg] } : {}
  const wrapperProps = props.wrapperProps
  const ScreenHeader = props.header ? Header : View

  const statusBarPropsDefault = {
    barStyle: props.barStyle || 'dark-content',
    backgroundColor: 'white',
    ...props.statusBarProps,
  }

  return (
    <View style={[preset.outer, backgroundStyle, props.containerStyle]}>
      <StatusBar {...statusBarPropsDefault} />
      <ScreenHeader {...props.header} />
      <KeyboardAwareScrollView
        {...props.keyboardAwareScrollViewProps}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView
          {...wrapperProps}
          {...safeAreaViewProps}
          style={[
            preset.outer,
            props.unsafe
              ? {}
              : { paddingBottom: insets.bottom, paddingTop: props.header ? 0 : insets.top },
            props.style,
          ]}
        >
          {props.children}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </View>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen = (props: ScreenProps) => {
  if (!props.preset || isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
