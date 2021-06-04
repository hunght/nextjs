import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../rootReducer'

import { isValidToken } from '../../helper/token'

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth.accessToken,
  (state: RootState) => state.auth.inRegistration,
  (accessToken, inRegistration) => (inRegistration ? false : isValidToken(accessToken))
)

export const selectError = createSelector(
  (state: RootState) => state.auth.error,
  (error) => {
    if (error !== null) {
      return error
    }
    return undefined
  }
)
