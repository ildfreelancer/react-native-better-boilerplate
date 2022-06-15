import { Screen, Text, Container, Box } from '@components/index'
import Routes from '@navigation/routes'
import { useCallback } from 'react'
import LinkItem from './components/link-item'

const HomeScreen = ({ navigation }) => {
  const onLinkItemPress = useCallback(
    (topic: string) => () => {
      navigation.navigate(Routes.Guide, { topic })
    },
    [navigation],
  )

  return (
    <Screen>
      <Container>
        <Text tx="introduction" textAlign="center" variant="boldM" />
        <Text tx="hint" variant="regularXS" mt="vs-1" textAlign="center" />
        <Box mt="vs-5">
          <LinkItem labelTx="path" usageTx="path_usage" onPress={onLinkItemPress('path')} />
          <LinkItem labelTx="i18n" usageTx="i18n_usage" onPress={onLinkItemPress('i18n')} />
          <LinkItem labelTx="fonts" usageTx="fonts_usage" onPress={onLinkItemPress('fonts')} />
          <LinkItem
            labelTx="responsive"
            usageTx="responsive_usage"
            onPress={onLinkItemPress('responsive')}
          />
          <LinkItem
            labelTx="components"
            usageTx="components_usage"
            onPress={onLinkItemPress('components')}
          />
          <LinkItem labelTx="theme" usageTx="theme_usage" onPress={onLinkItemPress('theme')} />
          <LinkItem
            labelTx="dark_mode"
            usageTx="dark_mode_usage"
            onPress={onLinkItemPress('dark_mode')}
          />
          <LinkItem
            labelTx="services"
            usageTx="services_usage"
            onPress={onLinkItemPress('services')}
          />
          <LinkItem
            labelTx="tips_and_tricks"
            usageTx="tips_and_tricks_usage"
            onPress={onLinkItemPress('tips_and_tricks')}
          />
        </Box>
      </Container>
    </Screen>
  )
}

export default HomeScreen
