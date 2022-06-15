/* eslint-disable react-native/no-inline-styles */
import { SText } from '@components/atom'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import {
  backgroundColor,
  backgroundColorShorthand,
  composeRestyleFunctions,
  layout,
  useRestyle,
} from '@shopify/restyle'
import type {
  LayoutProps,
  BackgroundColorProps,
  BackgroundColorShorthandProps,
} from '@shopify/restyle'
import { Theme } from '@styles/theme'
import { fontFamily as restyledFontFamily, fontSize as restyledFontSize } from '@styles/restyle'
import { typography } from '@styles/typography'

export type TextProps = Omit<ComponentProps<typeof SText>, 'fontSize' | 'fontFamily'> & {
  isTruncated?: boolean
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: Record<string, any>

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string | number | null

  fontFamily?: string

  fontSize?: keyof typeof typography.fontSize | number
} & LayoutProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  BackgroundColorProps<Theme>

const restyleFunc = composeRestyleFunctions<Theme, any>([
  layout,
  backgroundColor,
  backgroundColorShorthand,
  restyledFontFamily,
  restyledFontSize,
])
export const Text = (props: TextProps) => {
  const { t } = useTranslation()
  const { tx, txOptions, text, children, variant = 'regular', isTruncated, style, ...rest } = props
  const i18nText = tx && t(tx as any, txOptions)
  const content = i18nText || (typeof text === 'number' ? String(text) : text) || children
  const { style: restyled } = useRestyle(restyleFunc as any, rest)

  return (
    <SText
      variant={variant}
      ellipsizeMode={isTruncated ? 'tail' : undefined}
      style={[isTruncated ? { flexShrink: 1, flexWrap: 'wrap' } : {}, restyled[0], style]}
      {...(rest as any)}
    >
      {content}
    </SText>
  )
}
