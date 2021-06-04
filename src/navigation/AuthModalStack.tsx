import { createStackNavigator } from '@react-navigation/stack'

import React from 'react'
import AuthStack from '../journey/registration/AuthStack'

import SearchArtTypeScreen from '../journey/registration/search-list-modal/SearchArtTypeScreen'
import SearchCityScreen from '../journey/registration/search-list-modal/SearchCityScreen'
import SearchCountryCodeScreen from '../journey/registration/search-list-modal/SearchCountryCodeScreen'
import SearchCurrencyScreen from '../journey/registration/search-list-modal/SearchCurrencyScreen'
import SearchEventTypeScreen from '../journey/registration/search-list-modal/SearchEventTypeScreen'
import SearchGenreScreen from '../journey/registration/search-list-modal/SearchGenreScreen'
import SearchLocationScreen from '../journey/registration/search-list-modal/SearchLocationScreen'
import SearchSpecialtyScreen from '../journey/registration/search-list-modal/SearchSpecialtyScreen'

import { AuthModalStackParamList } from './type'

const Stack = createStackNavigator<AuthModalStackParamList>()

export default function RootStack(): React.ReactElement {
  return (
    <Stack.Navigator initialRouteName="AuthStack" mode="modal" headerMode="none">
      <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
      <Stack.Screen name="SearchArtTypeScreen" component={SearchArtTypeScreen} />
      <Stack.Screen name="SearchCityScreen" component={SearchCityScreen} />
      <Stack.Screen name="SearchCurrencyScreen" component={SearchCurrencyScreen} />
      <Stack.Screen name="SearchLocationScreen" component={SearchLocationScreen} />
      <Stack.Screen name="SearchCountryCodeScreen" component={SearchCountryCodeScreen} />
      <Stack.Screen name="SearchSpecialtyScreen" component={SearchSpecialtyScreen} />
      <Stack.Screen name="SearchGenreScreen" component={SearchGenreScreen} />
      <Stack.Screen name="SearchEventTypeScreen" component={SearchEventTypeScreen} />
    </Stack.Navigator>
  )
}
