import { Header as ReactNativeElementsHeader } from '@rneui/themed'
import { Button } from '../button'
import { Box } from '../atom'
import { Text } from '../text'
import { HeaderProps } from './header.props'
import { ScaledSheet } from '@lib/react-native-size-matters'
import { palette } from '@styles/palette'
import {
  backgroundColor,
  backgroundColorShorthand,
  border,
  useRestyle,
  layout,
  composeRestyleFunctions,
  spacingShorthand,
  spacing,
  shadow,
} from '@shopify/restyle'

const restyledFuncs = composeRestyleFunctions([
  backgroundColor,
  backgroundColorShorthand,
  border,
  layout,
  spacingShorthand,
  spacing,
  shadow,
])
export const Header = (props: HeaderProps) => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    header,
    headerTx,
    headerTxOptions,
    headerTextProps,
    style = {},
    leftButtonProps,
    rightButtonProps,
    statusBarProps = { translucent: true, backgroundColor: 'transparent' },
    ...rest
  } = props

  const { style: customStyle } = useRestyle(restyledFuncs as any, { ...style, ...rest })
  return (
    <ReactNativeElementsHeader
      leftComponent={
        (leftIcon || leftButtonProps) && (
          <Button
            alignItems="center"
            margin="none"
            padding="none"
            variant="clear"
            onPress={onLeftPress}
            icon={leftIcon}
            px="s-2"
            py="vs-1.5"
            {...leftButtonProps}
          />
        )
      }
      centerComponent={
        <Box justifyContent="center">
          <Text
            numberOfLines={1}
            tx={headerTx}
            text={header}
            txOptions={headerTxOptions}
            variant="header"
            {...headerTextProps}
          />
        </Box>
      }
      rightComponent={
        (rightIcon || rightButtonProps) && (
          <Button
            alignItems="center"
            margin="none"
            padding="none"
            variant="clear"
            onPress={onRightPress}
            icon={rightIcon}
            px="s-4"
            py="vs-1.5"
            {...rightButtonProps}
          />
        )
      }
      leftContainerStyle={styles.leftContainer}
      rightContainerStyle={styles.rightContainer}
      centerContainerStyle={styles.centerContainer}
      statusBarProps={statusBarProps}
      containerStyle={[styles.container, customStyle]}
      {...rest}
    />
  )
}

// static styles

const styles = ScaledSheet.create({
  centerContainer: {
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: palette.blue[500],
    borderBottomWidth: 0,
    // paddingHorizontal: 0,
    // elevation: 3,
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
  },
  leftContainer: {
    justifyContent: 'center',
  },
  rightContainer: {
    justifyContent: 'center',
  },
})
