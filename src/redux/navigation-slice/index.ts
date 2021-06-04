/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NavigationState } from './type'

const initialState: NavigationState = {}

const { reducer, actions } = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentNavigation(state, action: PayloadAction<NavigationState>): void {
      state.currentRouteName = action.payload.currentRouteName
      state.currentRouteParams = action.payload.currentRouteParams
    },
  },
})
export const { setCurrentNavigation } = actions
export { reducer }
