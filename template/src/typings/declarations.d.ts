import { RootParamList as RootStackParamList } from '@navigation/params'

declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare global {
  namespace ReactNavigation {
    type RootParamList = RootStackParamList
  }
}
