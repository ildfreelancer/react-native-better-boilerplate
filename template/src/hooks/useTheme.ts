import { useTheme as useRestyleTheme } from '@shopify/restyle'
import { Theme } from '@styles/theme'

export const useTheme = () => useRestyleTheme<Theme>()
