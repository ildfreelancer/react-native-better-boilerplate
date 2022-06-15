import { Avatar as RNEAvatar, AvatarProps as RNEAvatarProps } from '@rneui/themed'
import FastImage from 'react-native-fast-image'
import { Box, BoxProps } from '@components/atom'
import { Theme } from '@styles/theme'
import { palette } from '@styles/palette'

export type AvatarProps = RNEAvatarProps & {
  size?: number
  bg?: keyof Theme['colors']
  _container?: BoxProps
}
export const Avatar = ({
  bg = 'white',
  size = 50,
  source,
  title,
  _container,
  ...rest
}: AvatarProps) => {
  return (
    <Box
      height={size}
      width={size}
      borderRadius="full"
      justifyContent="center"
      alignItems="center"
      shadowRadius={3}
      shadowOffset={{
        width: 0,
        height: 1.67,
      }}
      shadowColor="black"
      shadowOpacity={0.1}
      bg={bg}
      {..._container}>
      <RNEAvatar
        size={size - 2}
        ImageComponent={FastImage as never}
        rounded
        title={title}
        source={source ?? {}}
        containerStyle={{ backgroundColor: palette.blue[500] }}
        {...rest}
      />
    </Box>
  )
}
