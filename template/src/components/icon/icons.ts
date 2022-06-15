export const icons = {
  'demo-one': require('@assets/icons/demo-one.svg').default,
  'demo-two': require('@assets/icons/demo-two.svg').default,
  // import your other svg here from assets folder
}

export type IconName = keyof typeof icons
