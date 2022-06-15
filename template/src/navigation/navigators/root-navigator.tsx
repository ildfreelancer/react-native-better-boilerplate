import { RootParamList } from '@navigation/params'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ComponentProps, forwardRef } from 'react'
import Routes from '../routes'

const Stack = createStackNavigator<RootParamList>()
const RootStack = () => {
  return (
    <Stack.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Routes.AuthorizedNavigator}
        component={require('./authorized-navigator').default}
      />
      <Stack.Screen name={Routes.Guide} component={require('@screens/guide-screen').default} />
    </Stack.Navigator>
  )
}

export const RootNavigator = forwardRef<
  NavigationContainerRef<any>,
  Partial<ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})
RootNavigator.displayName = 'RootNavigator'

const exitRoutes = [Routes.AuthorizedNavigator]
export const canExit = (routeName: string) => exitRoutes.includes(routeName as any)
