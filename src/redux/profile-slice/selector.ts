import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../rootReducer'

export const selectUserIsMusicianOrDJ = createSelector(
  (state: RootState) => state.profile.user,

  (user) => {
    return user?.art_type?.slug === 'musicians' || user?.art_type?.slug === 'djs'
  }
)
