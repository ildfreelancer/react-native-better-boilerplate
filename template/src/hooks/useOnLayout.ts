import { useCallback, useState } from 'react'
import { LayoutChangeEvent, LayoutRectangle } from 'react-native'

type Layout = {
  x: number
  y: number
  width: number
  height: number
}

export const useOnLayout = (): [LayoutRectangle, (event: LayoutChangeEvent) => void] => {
  const [layout, setLayout] = useState<Layout>({ x: 0, y: 0, width: 0, height: 0 })

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => setLayout(event.nativeEvent.layout),
    [],
  )

  return [layout, onLayout]
}
