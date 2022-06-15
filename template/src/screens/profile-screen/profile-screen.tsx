import { Screen, Text, Container, Center } from '@components/index'

const ProfileScreen = () => {
  return (
    <Screen>
      <Container>
        <Center>
          <Text>(This is hardcoded text)</Text>
          <Text mt="vs-3" textAlign="center">
            The idea of this boilerplate is to provide the setup out of box, no magic and easy to
            customize.
          </Text>
          <Text mt="vs-5" variant="boldS">
            More magic, more headache.
          </Text>
        </Center>
      </Container>
    </Screen>
  )
}

export default ProfileScreen
