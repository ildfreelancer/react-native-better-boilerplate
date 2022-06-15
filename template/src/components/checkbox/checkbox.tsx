import { s, ScaledSheet } from '@lib/react-native-size-matters'
import { composeRestyleFunctions, useRestyle, createVariant } from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { useTranslation } from 'react-i18next'
import { CheckBox, CheckBoxProps } from '@rneui/themed'
import { Icon } from '../icon/icon'
import { fontFamily as restyledFontFamily, fontSize as restyledFontSize } from '@styles/restyle'
import { TextProps } from '@components/text'

type CheckboxProps = CheckBoxProps & {
  type: 'radio' | 'check'
  titleTx?: string
  titleTxOptions?: Record<string, number | string>
  checkedIconProps?: Record<string, any>
  uncheckedIconProps?: Record<string, any>
  _text?: TextProps
}

const getCheckIcon = (type: string) => {
  if (type === 'check') {
    return 'check'
  }
  return 'radio-checked'
}
const getUnCheckedIcon = (type: string) => {
  if (type === 'check') {
    return 'radio-unchecked'
  }
  return 'radio-unchecked'
}

const restyleFunc = composeRestyleFunctions<Theme, any>([
  restyledFontFamily,
  restyledFontSize,
  createVariant({ themeKey: 'textVariants' }),
])
export const Checkbox = ({
  type = 'check',
  titleTx,
  titleTxOptions,
  title,
  checkedIconProps,
  uncheckedIconProps,
  textStyle,
  _text,
  ...rest
}: CheckboxProps) => {
  const { t } = useTranslation()
  const { style: restyledTitle } = useRestyle(restyleFunc as any, {
    variant: 'regular',
    ..._text,
  })
  const transformedTitle = titleTx ? t(titleTx as any, titleTxOptions) : title
  return (
    <CheckBox
      checkedIcon={
        <Icon name={getCheckIcon(type)} color="primary" size={s(20)} {...checkedIconProps} />
      }
      uncheckedIcon={
        <Icon name={getUnCheckedIcon(type)} color="primary" size={s(20)} {...uncheckedIconProps} />
      }
      title={transformedTitle}
      textStyle={[styles.text, restyledTitle, textStyle]}
      containerStyle={styles.container}
      {...(rest as any)}
    />
  )
}

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginLeft: 0,
    margin: 0,
    marginRight: 0,
    borderWidth: 0,
    borderRadius: 0,
  },
  text: {
    fontWeight: '400',
  },
})
