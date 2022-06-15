import { Box, BoxProps } from '../atom'
import { StyleProp, ViewStyle } from 'react-native'
import { ReactNode } from 'react'

export type CardProps = BoxProps & {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}
export const Card = ({ style, children, ...props }: CardProps) => {
  return (
    <Box
      bg="white"
      style={style}
      shadowOpacity={0.12}
      elevation={3}
      borderRadius="s-1.5"
      shadowRadius={1.4}
      shadowColor="black"
      shadowOffset={{
        width: 0,
        height: 2,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
