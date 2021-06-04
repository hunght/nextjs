import { combineReducers } from '@reduxjs/toolkit'

import { reducer as auth } from './auth-slice'
import { reducer as profile } from './profile-slice'
import { reducer as completeness } from './completeness-slice'
import { reducer as navigation } from './navigation-slice'

const rootReducer = combineReducers({
  auth,
  profile,
  completeness,
  navigation,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
