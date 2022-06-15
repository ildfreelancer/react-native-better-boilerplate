import { createRestyleFunction } from '@shopify/restyle'

export const fontSize = createRestyleFunction({
  property: 'fontSize',
  styleProperty: 'fontSize',
  transform: ({ theme, value }) => {
    if (typeof value === 'string') {
      return theme.fontSize[value]
    }
    return value
  },
})

export const fontFamily = createRestyleFunction({
  property: 'fontFamily',
  styleProperty: 'fontFamily',
  transform: ({ theme, value }) => {
    return theme.fontFamily[value] || value
  },
})
