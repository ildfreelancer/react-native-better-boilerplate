import { Screen, Container } from '@components/index'
import { RootParamList } from '@navigation/params'
import { NavigationProp, RouteProp } from '@react-navigation/native'
import Markdown from 'react-native-markdown-display'
import guides from './guides'

type GuideScreenProps = {
  navigation: NavigationProp<RootParamList, 'Guide'>
  route: RouteProp<RootParamList, 'Guide'>
}
const GuideScreen = ({ navigation, route }: GuideScreenProps) => {
  const topic = route.params.topic
  return (
    <Screen
      header={{
        headerTx: 'guideline',
        leftIcon: {
          name: 'ios-arrow-back',
          type: 'ionicon',
        },
        onLeftPress: navigation.goBack,
      }}
      preset="scroll"
    >
      <Container>
        <Markdown>{guides[topic]}</Markdown>
      </Container>
    </Screen>
  )
}

export default GuideScreen
