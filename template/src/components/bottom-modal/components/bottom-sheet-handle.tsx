import { BottomSheetHandleProps } from '@gorhom/bottom-sheet'
import { FC } from 'react'
import { StyleProp, ViewStyle, View } from 'react-native'
import { ScaledSheet } from '@lib/react-native-size-matters'
import { Box } from '@components/atom'

interface HandleProps extends BottomSheetHandleProps {
  style?: StyleProp<ViewStyle>
}

export const BottomSheetHandle: FC<HandleProps> = ({ style }) => {
  return (
    <View style={[styles.header, style]} renderToHardwareTextureAndroid={true}>
      <Box style={styles.indicator} bg="bg4" />
    </View>
  )
}

const styles = ScaledSheet.create({
  header: {
    alignContent: 'center',
    alignItems: 'center',
    height: '30@vs',
    paddingTop: '8@vs',
  },
  indicator: {
    width: '30@s',
    height: '3@vs',
    borderRadius: '46@vs',
  },
})
