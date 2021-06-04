import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../rootReducer'

export const selectCompletedStepsNumber = createSelector(
  (state: RootState) => state.completeness.completeness,

  (completeness) => {
    if (!completeness) {
      return 0
    }
    return Object.entries(completeness).filter(
      ([key, value]) => key !== 'profile_completion' && value === 100
    ).length
  }
)

export const selectIsPendingStatus = createSelector(
  (state: RootState) => state.completeness.completeness,
  (state: RootState) => state.profile.user?.status,
  (completeness, status) => {
    return (
      completeness?.basic_info === 100 &&
      completeness?.artist_profile === 100 &&
      completeness?.photos === 100 &&
      status === 'pending'
    )
  }
)
export const selectIsApprovedStatus = createSelector(
  (state: RootState) => state.profile.user?.status,
  (status) => {
    return status === 'approved'
  }
)
export const selectIsDeclinedStatus = createSelector(
  (state: RootState) => state.profile.user?.status,
  (status) => {
    return status === 'declined'
  }
)

export const selectTotalStepsNumber = createSelector(
  (state: RootState) => state.completeness.completeness,
  (completeness) => {
    if (!completeness) {
      return 0
    }
    return Object.entries(completeness).filter(([key]) => key !== 'profile_completion').length
  }
)
