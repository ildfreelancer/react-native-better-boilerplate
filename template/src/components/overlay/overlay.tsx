import { ScaledSheet } from '@lib/react-native-size-matters'
import { Overlay as RNEOverlay, OverlayProps as RNOverlayProps } from '@rneui/themed'

export type OverlayProps = RNOverlayProps
export const Overlay = (props: OverlayProps) => {
  return <RNEOverlay overlayStyle={styles.overlay} {...props} />
}

const styles = ScaledSheet.create({
  overlay: {
    backgroundColor: 'transparent',
  },
})
