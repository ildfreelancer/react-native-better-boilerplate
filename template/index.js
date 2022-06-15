import 'react-native-gesture-handler'
import { AppRegistry, LogBox, Text } from 'react-native'

Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.maxFontSizeMultiplier = 1.2

import App from './src/app'
import { name as appName } from './app.json'
import { setSizeMattersBaseWidth, setSizeMattersBaseHeight } from './lib/react-native-size-matters'
import Config from 'react-native-config'

// Setup responsive scale across the devices
setSizeMattersBaseWidth(parseInt(Config.SIZE_MATTERS_BASE_WIDTH, 10))
setSizeMattersBaseHeight(parseInt(Config.SIZE_MATTERS_BASE_HEIGHT, 10))

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'ViewPropTypes will be removed',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'Non-serializable values were found in the navigation state',
  'Require cycle: node_modules/victory',
])

AppRegistry.registerComponent(appName, () => App)
