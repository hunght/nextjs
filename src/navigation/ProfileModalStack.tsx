import { createStackNavigator } from '@react-navigation/stack'

import React from 'react'

import { ProfileModalParamList } from './type'

import SearchCityScreen from '../journey/profile/search-list-modal/SearchCityScreen'
import SearchCurrencyScreen from '../journey/profile/search-list-modal/SearchCurrencyScreen'
import SearchEventTypeScreen from '../journey/profile/search-list-modal/SearchEventTypeScreen'
import SearchGenreScreen from '../journey/profile/search-list-modal/SearchGenreScreen'
import SearchLocationScreen from '../journey/profile/search-list-modal/SearchLocationScreen'
import SearchSpecialtyScreen from '../journey/profile/search-list-modal/SearchSpecialtyScreen'
import ProfileStack from '../journey/profile/ProfileStack'
import SearchLanguageScreen from '../journey/profile/search-list-modal/SearchLanguageScreen'
import SearchCountryCodeScreen from '../journey/profile/search-list-modal/SearchCountryCodeScreen'

const Stack = createStackNavigator<ProfileModalParamList>()
const RootStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileStack" headerMode="none" mode="modal">
      <Stack.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false }} />

      <Stack.Screen name="SearchCityScreen" component={SearchCityScreen} />
      <Stack.Screen name="SearchCurrencyScreen" component={SearchCurrencyScreen} />
      <Stack.Screen name="SearchLocationScreen" component={SearchLocationScreen} />
      <Stack.Screen name="SearchCountryCodeScreen" component={SearchCountryCodeScreen} />
      <Stack.Screen name="SearchSpecialtyScreen" component={SearchSpecialtyScreen} />
      <Stack.Screen name="SearchGenreScreen" component={SearchGenreScreen} />
      <Stack.Screen name="SearchEventTypeScreen" component={SearchEventTypeScreen} />
      <Stack.Screen name="SearchLanguageScreen" component={SearchLanguageScreen} />
    </Stack.Navigator>
  )
}
export default RootStack
