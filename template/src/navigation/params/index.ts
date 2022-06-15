import Routes from '../routes'

export type RootParamList = {
  [Routes.Guide]: { topic: string }

  // AuthorizedNavigator
  [Routes.AuthorizedNavigator]: undefined
}

export type AuthorizedParamList = {
  [Routes.Home]: undefined
  [Routes.Profile]: undefined
}
