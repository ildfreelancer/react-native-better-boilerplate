import { memo, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components/text'
import { Box } from '@components/atom'

interface ListSecuredGuardProps {
  listGuard: Array<{ name?: string; nameTx?: string; checkFnc: (value: string) => boolean }>
  value: string
  onValid?: () => void
  onUnValid?: () => void
}

export const ListSecuredGuard = memo(
  ({ listGuard, value, onValid, onUnValid }: ListSecuredGuardProps) => {
    const [isValidAll, setIsValidAll] = useState(false)

    useEffect(() => {
      let valid = true
      listGuard.forEach(guard => {
        if (!guard?.checkFnc?.(value)) {
          valid = false
        }
      })
      setIsValidAll(valid)
    }, [listGuard, value])

    useEffect(() => {
      if (isValidAll) {
        onValid?.()
      } else {
        onUnValid?.()
      }
    }, [isValidAll, onUnValid, onValid])

    return (
      <View style={styles.container}>
        {listGuard.map((guard, index) => {
          const isValid = guard?.checkFnc?.(value)

          return (
            <Box
              key={index}
              bg={isValid ? 'bg2' : 'bg1'}
              borderRadius="s-3"
              px="s-2.5"
              py="s-1.5"
              mt="s-1.5"
              mr="s-1.5">
              <Text
                key={index}
                text={guard.name}
                tx={guard.nameTx}
                color={isValid ? 'success' : 'text1'}
                variant="semiBold"
                fontSize={11}
              />
            </Box>
          )
        })}
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
})
