import { IconProps, Icon } from '@components/icon'
import { HStack } from '@components/atom'
import { Text } from '@components/text'
import type { BoxProps } from '@components/atom'
import type { TextProps } from '@components/text'
import type { Theme } from '@styles/theme'

export type ChipProps = BoxProps & {
  testID?: string
  icon?: string | IconProps
  tx?: string
  text?: string
  _text?: TextProps
  textColor?: keyof Theme['colors']
}

export const Chip = ({
  bg = 'blue_100',
  testID,
  icon,
  tx,
  text,
  textColor = 'primary',
  _text,
  ...rest
}: ChipProps) => {
  return (
    <HStack
      testID={testID}
      borderRadius="s-2"
      px="s-2"
      py="s-0.5"
      bg={bg as keyof Theme['colors']}
      alignSelf="baseline"
      my="vs-0.5"
      {...rest}>
      {typeof icon === 'string' ? <Icon name={icon} /> : <Icon {...icon} />}
      <Text tx={tx} text={text} variant="semiBoldXS" color={textColor} lineHeight={0} {..._text} />
    </HStack>
  )
}
