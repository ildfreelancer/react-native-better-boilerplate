import { Text, TextProps } from '@components/text'
import { ScaledSheet } from '@lib/react-native-size-matters'
import MaskedView from '@react-native-masked-view/masked-view'
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient'

type TextGradientProps = TextProps & {
  _gradient?: LinearGradientProps
}
export const TextGradient = ({ _gradient, ...rest }: TextGradientProps) => {
  return (
    <MaskedView maskElement={<Text {...rest} />}>
      <LinearGradient
        locations={[0, 0.6, 1]}
        colors={['red', 'blue']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        {..._gradient}>
        <Text style={styles.text} {...rest} />
      </LinearGradient>
    </MaskedView>
  )
}

const styles = ScaledSheet.create({
  text: {
    opacity: 0,
  },
})
