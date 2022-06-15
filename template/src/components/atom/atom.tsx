import { createBox, createText, BoxProps as RSBoxProps } from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export const Box = createBox<Theme>()
export const SText = createText<Theme>()

export type BoxProps = RSBoxProps<Theme> & {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

export const HStack = ({ children, ...props }: BoxProps) => (
  <Box flexDirection="row" {...props}>
    {children}
  </Box>
)

export const VStack = ({ children, ...props }: BoxProps) => (
  <Box flexDirection="column" {...props}>
    {children}
  </Box>
)

export const Flex = ({ children, ...props }: BoxProps) => (
  <Box flex={1} {...props}>
    {children}
  </Box>
)

export const Container = ({ children, ...props }: BoxProps) => (
  <Flex px="vs-5" {...props}>
    {children}
  </Flex>
)

export const Center = ({ children, ...props }: BoxProps) => (
  <Flex justifyContent="center" alignItems="center" {...props}>
    {children}
  </Flex>
)
