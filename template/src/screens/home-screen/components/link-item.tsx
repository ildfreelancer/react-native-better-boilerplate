import { HStack, Text, TouchableOpacity, Flex } from '@components/index'
import { vs } from '@lib/react-native-size-matters'

type LinkItemProps = {
  labelTx: string
  usageTx: string
  onPress: () => void
}
const LinkItem = ({ labelTx, usageTx, onPress }: LinkItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <HStack height={vs(40)}>
      <Flex>
        <Text tx={labelTx} color="link" variant="regularS" />
      </Flex>
      <Flex flex={2}>
        <Text tx={usageTx} variant="regularXS" />
      </Flex>
    </HStack>
  </TouchableOpacity>
)

export default LinkItem
