import { useTheme } from '@hooks/useTheme'
import { ColorProps } from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { Switch as RNESwitch, SwitchProps as RNEDSwitchProps } from '@rneui/themed'

type DividerProps = Omit<RNEDSwitchProps, 'color'> & {
  color?: ColorProps<Theme> | string
}
export const Switch = ({
  color = 'primary',
  trackColor = { true: 'grey_300', false: 'white' },
  thumbColor = 'primary',
  ios_backgroundColor = 'white',
  value,
  ...rest
}: DividerProps) => {
  const theme = useTheme()

  const outputColor = theme.colors[color as keyof Theme['colors']] ?? color
  const outputThumbColor = value
    ? theme.colors[thumbColor as keyof Theme['colors']] ?? thumbColor
    : 'white'
  const outputTrackColor = {
    true: theme.colors[trackColor?.true as keyof Theme['colors']] ?? trackColor?.true,
    false: theme.colors[trackColor?.true as keyof Theme['colors']] ?? (trackColor?.true || 'white'),
  }
  return (
    <RNESwitch
      value={value}
      color={outputColor}
      trackColor={outputTrackColor}
      thumbColor={outputThumbColor}
      ios_backgroundColor={ios_backgroundColor}
      {...rest}
    />
  )
}
