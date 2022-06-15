import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthorizedParamList } from '../params'
import Routes from '../routes'
import Ionicons from 'react-native-vector-icons/Ionicons'

const BottomTab = createBottomTabNavigator<AuthorizedParamList>()
const AuthorizedNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === Routes.Home) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === Routes.Profile) {
            iconName = focused ? 'person' : 'person-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <BottomTab.Screen
        name={Routes.Home}
        options={{
          tabBarLabel: 'Home',
        }}
        component={require('@screens/home-screen').default}
      />
      <BottomTab.Screen
        name={Routes.Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
        component={require('@screens/profile-screen').default}
      />
    </BottomTab.Navigator>
  )
}

export default AuthorizedNavigator
