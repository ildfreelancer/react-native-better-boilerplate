import { enableScreens } from 'react-native-screens'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager, QueryClient, QueryClientProvider } from 'react-query'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ViewStyle, StatusBar } from 'react-native'
import { setI18nConfig } from '@i18n/setup'
import Toast from 'react-native-toast-message'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context'
import { ThemeProvider } from '@shopify/restyle'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@state/index'
import { Provider } from 'react-redux'
import { theme } from '@styles/theme'
import { AppWrapper } from './app-wrapper'
import { ThemeProvider as RNEThemeProvider } from '@rneui/themed'
import { Toast as CustomToast } from '@components/toast'
import { Loading } from '@components/loading'
import { Api } from '@services/api'
import { Popup } from '@components/popup'
import { ActionSheet } from '@components/action-sheet'

enableScreens()
setI18nConfig()
// inti api service
Api.instance

const toastConfig = {
  success: internalState => <CustomToast type="success" internalState={internalState} />,
  error: internalState => <CustomToast type="error" internalState={internalState} />,
  warning: internalState => <CustomToast type="warning" internalState={internalState} />,
}

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected)
  })
})

const queryClient = new QueryClient()
if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient })
  })
}

const ROOT: ViewStyle = { flex: 1 }
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={ROOT}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <RNEThemeProvider>
                <ThemeProvider theme={theme}>
                  <BottomSheetModalProvider>
                    <StatusBar barStyle="dark-content" />
                    <AppWrapper />
                  </BottomSheetModalProvider>
                  <Toast config={toastConfig} />
                  <Loading />
                  <Popup />
                  <ActionSheet />
                </ThemeProvider>
              </RNEThemeProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
