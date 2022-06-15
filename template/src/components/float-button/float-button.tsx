import { Box, BoxProps } from '@components/atom'
import { IconButton, IconButtonProps } from '@components/icon-button'
import { s } from '@lib/react-native-size-matters'

type FloatButtonProps = Omit<IconButtonProps, 'name'> & {
  _container?: BoxProps
  name?: string
}
export const FloatButton = ({ _container, name = 'add', ...rest }: FloatButtonProps) => {
  return (
    <Box
      position="absolute"
      elevation={3}
      shadowOffset={{
        width: 0,
        height: 4,
      }}
      shadowOpacity={0.3}
      shadowRadius={20}
      shadowColor="primary"
      bottom={s(24)}
      right={s(20)}
      {..._container}>
      <IconButton
        name={name}
        color="white"
        bg="primary"
        size={s(20)}
        height={s(48)}
        width={s(48)}
        borderRadius="full"
        {...rest}
      />
    </Box>
  )
}
