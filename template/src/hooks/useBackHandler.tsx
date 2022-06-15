import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { BackHandler } from 'react-native'

export const useAndroidBackHandler = onBackPress =>
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [onBackPress]),
  )

export const AndroidBackHandler = ({ onBackPress, children = null }) => {
  useAndroidBackHandler(onBackPress)

  return children
}

/*
  import { useAndroidBackHandler } from "@hooks/useBackHandler";

  const SomeComponent = () => {
    useAndroidBackHandler(() => {

      //   Returning `true` denotes that we have handled the event,
      //  and react-navigation's lister will not get called, thus not popping the screen.
      //
      //   Returning `false` will cause the event to bubble up and react-navigation's listener will pop the screen.

      if (youWantToHandleTheBackButtonPress) {
        // do something
        return true;
      }

      return false;
    });

    return <BodyOfYourScreen />;
  };

*/
