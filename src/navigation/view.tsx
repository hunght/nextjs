import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationContainerRef,
} from '@react-navigation/native'

import React, { useEffect, useState } from 'react'
import { ColorSchemeName } from 'react-native'

import { PropsFromRedux } from '.'
import { useAppSelector } from '../redux/store'

import AuthModalStack from './AuthModalStack'
import { useAuthenticationEffect } from './hook'
import ProfileModalStack from './ProfileModalStack'

type Props = PropsFromRedux & {
  colorScheme: ColorSchemeName
}

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
  isAuthenticated,
  accessToken,

  setCurrentNavigation,
}: Props): React.ReactElement {
  useAuthenticationEffect(isAuthenticated, accessToken)

  const routeNameRef = React.useRef<string>()
  const navigationRef = React.createRef<NavigationContainerRef>()
  const inRegistrationProp = useAppSelector((state) => state.auth.inRegistration)

  const [inRegistration, setInRegistration] = useState(inRegistrationProp)

  useEffect(() => {
    if (inRegistration && !inRegistrationProp) {
      navigationRef?.current?.navigate('ProfileTab')
    }

    setInRegistration(inRegistrationProp)
  }, [inRegistrationProp])

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={(): void => {
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name
        routeNameRef.current = currentRouteName
      }}
      onStateChange={(): void => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name

        if (previousRouteName !== currentRouteName) {
          setCurrentNavigation({
            currentRouteName,
            currentRouteParams: navigationRef?.current?.getCurrentRoute()?.params,
          })
          console.log(`*** currentRouteName ***`)
          console.log(currentRouteName)
          console.log(navigationRef?.current?.getCurrentRoute()?.params)

          // analytics().logEvent('navigation', {
          //   routeName: currentRouteName,
          //   params: navigationRef?.current?.getCurrentRoute()?.params,
          // });
        }
        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName
      }}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      {isAuthenticated ? <ProfileModalStack /> : <AuthModalStack />}
    </NavigationContainer>
  )
}
