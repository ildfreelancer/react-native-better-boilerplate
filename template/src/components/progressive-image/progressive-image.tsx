import { useState } from 'react'
import { View, StyleSheet, Animated, ViewStyle, ImageStyle } from 'react-native'
import FastImage, { FastImageProps, Source } from 'react-native-fast-image'
import {
  backgroundColor,
  backgroundColorShorthand,
  border,
  layout,
  spacing,
  spacingShorthand,
  useRestyle,
  composeRestyleFunctions,
} from '@shopify/restyle'
import type {
  BorderProps,
  LayoutProps,
  SpacingProps,
  SpacingShorthandProps,
} from '@shopify/restyle'
import { pick } from '@utils/lodash'
import { Theme } from '@styles/theme'
import { palette } from '@styles/palette'

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage)
export type ProgressiveImageProps = FastImageProps & {
  thumbnailSource?: Source
  containerStyle?: ViewStyle | ViewStyle[]
} & LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme>

const restyleFuncs = composeRestyleFunctions([
  layout,
  spacing,
  border,
  backgroundColor,
  backgroundColorShorthand,
  spacingShorthand,
]) as any
export const ProgressiveImage = (props: ProgressiveImageProps) => {
  const {
    containerStyle,
    style,
    thumbnailSource,
    source,
    children,
    resizeMode = 'cover',
    ...rest
  } = props
  const { style: container }: any = useRestyle(restyleFuncs, rest as any)
  const [thumbnailAnimated] = useState(new Animated.Value(0))
  const [imageAnimated] = useState(new Animated.Value(0))

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
    Animated.timing(thumbnailAnimated, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  const AnimatedComponent = thumbnailSource ? Animated.Image : Animated.View
  return (
    <View style={StyleSheet.flatten([styles.container, containerStyle, container])}>
      <AnimatedComponent
        source={thumbnailSource as any}
        style={StyleSheet.flatten([
          styles.thumbnail,
          { opacity: thumbnailAnimated },
          pick(container[0], [
            'borderRadius',
            'borderTopRightRadius',
            'borderTopLeftRadius',
            'borderBottomRightRadius',
            'borderBottomLeftRadius',
          ]),
          style as ImageStyle,
        ])}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
        resizeMode={resizeMode}
      />
      <AnimatedFastImage
        source={source}
        style={StyleSheet.flatten([
          styles.imageOverlay,
          { opacity: imageAnimated },
          pick(container[0], [
            'borderRadius',
            'borderTopRightRadius',
            'borderTopLeftRadius',
            'borderBottomRightRadius',
            'borderBottomLeftRadius',
            'backgroundColor',
          ]),
          style,
        ])}
        onLoad={onImageLoad}
        resizeMode={resizeMode}
      />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    position: 'relative',
    backgroundColor: 'gray',
  },
  thumbnail: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  imageOverlay: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
})
