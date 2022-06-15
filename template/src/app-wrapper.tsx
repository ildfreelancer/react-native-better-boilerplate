import { useRef, useEffect, useState } from 'react'
import { setRootNavigation, useBackButtonHandler, RootNavigator, canExit } from '@navigation/index'
import { useReduxDispatch } from '@hooks/useRedux'

export const AppWrapper = () => {
  const navigationRef = useRef(null)
  const [navigationReady, setNavigationReady] = useState(false)
  const dispatch = useReduxDispatch()

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)

  useEffect(() => {
    if (navigationReady) {
      fetch('https://geolocation-db.com/json')
        .then(json => json.json())
        .then(data => {
          dispatch.app.updateSession({
            country_code: data.country_code,
            country_name: data.country_name,
            latitude: data.latitude,
            longitude: data.longitude,
            city: data.city,
            state: data.state,
          })
        })
    }
  }, [dispatch.app, navigationReady])

  return (
    <RootNavigator
      ref={navigationRef}
      onReady={() => {
        setNavigationReady(true)
      }}
    />
  )
}
