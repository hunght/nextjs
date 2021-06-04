/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

import { getProfileReducer } from './getProfileReducer'
import { ProfileState } from './type'
import { updateAvatarReducers } from './updateAvatarReducer'
import { updateProfileReducers } from './updateProfileReducer'

const initialState: ProfileState = { isloading: false }

const { reducer, actions } = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    updateProfileReducers(builder)
    updateAvatarReducers(builder)
    getProfileReducer(builder)
  },
})
export { reducer, actions as sessionAction }
