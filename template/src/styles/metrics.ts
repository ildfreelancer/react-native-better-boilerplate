import { Dimensions, Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('window')
const platform = Platform.OS
const screenWidth = width < height ? width : height
const screenHeight = width < height ? height : width
const statusBarHeightAnimation = getStatusBarHeight()
const headerHeight =
  Platform.select({
    android: 56,
    default: 56,
  }) + statusBarHeightAnimation
const bottomBarHeight = 75
export const metrics = {
  screenWidth,
  screenHeight,
  platform,
  statusBarHeightAnimation,
  headerHeight,
  bottomBarHeight,
}
