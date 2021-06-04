import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Home } from './src/container/Home'

import { Profile } from './src/container/Profile'
// See the pages/folder for the next.js routes
// everything else is confined in this file :)

const AppNavigator = createStackNavigator({
  '/': Home,
  Profile,
})

export default createAppContainer(AppNavigator)

import * as React from 'react'
import { useColorScheme } from 'react-native'

import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'
import Navigation from './src/navigation'
import { store, persistor } from './src/redux/store'

export default function App(): React.ReactElement | null {
  const colorScheme = useColorScheme()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}
