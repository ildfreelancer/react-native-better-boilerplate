import { Box } from '../atom'
import { Text } from '../text'
import { useMemo } from 'react'
import { ScaledSheet } from '@lib/react-native-size-matters'

interface ToastWarningProps {
  internalState: Record<string, any>
  type: 'success' | 'error' | 'warning'
}

export const Toast = ({ internalState: { text1, text2 }, type }: ToastWarningProps) => {
  const colors: any = useMemo(() => {
    switch (type) {
      case 'error': {
        return {
          backgroundColor: 'error',
        }
      }
      default: {
        return {
          backgroundColor: 'primary',
        }
      }
    }
  }, [type])
  return (
    <Box width="100%">
      <Box style={styles.container} backgroundColor={colors.backgroundColor}>
        {!!text1 && <Text variant="semiBoldM" color="white" text={text1} />}
        {!!text2 && <Text variant="regular" color="white" text={text2} />}
      </Box>
    </Box>
  )
}

const styles = ScaledSheet.create({
  container: {
    elevation: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.48,
    shadowRadius: 10.32,
    paddingHorizontal: '20@s',
    paddingVertical: '16@vs',
    marginHorizontal: '16@s',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})
