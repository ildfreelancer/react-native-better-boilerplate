import { Button, ButtonProps } from '@components/button'
import { IconProps } from '@components/icon'
import { s } from '@lib/react-native-size-matters'

export type IconButtonProps = Omit<ButtonProps, 'type'> & Omit<IconProps, 'borderRadius'>

export const IconButton = ({
  name,
  size = s(22),
  color = 'black',
  type,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      variant="clear"
      icon={{
        name,
        size,
        color,
        type,
      }}
      {...props}
    />
  )
}
