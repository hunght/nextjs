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
